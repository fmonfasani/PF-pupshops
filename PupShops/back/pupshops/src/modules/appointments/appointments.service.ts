import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { User } from '../../modules/users/entities/user.entity';
import { Service } from '../../modules/service/entities/services.entity';
import { AppointmentStatus } from '../appointments/entities/appointment-status.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
    user: any,
  ): Promise<{
    message: string;
    appointmentId: string;
    serviceId: string;
    serviceName: string;
    userId: string;
    userName: string;
  }> {
    const appointmentDateAux = new Date(createAppointmentDto.appointmentDate);

    // Validar si la fecha es mayor a la fecha actual
    const currentDate = new Date();
    if (appointmentDateAux <= currentDate) {
      throw new BadRequestException(
        'Los turnos solo pueden agendarse en fechas futuras',
      );
    }

    // Validar si la fecha es lunes a viernes
    const dayOfWeek = appointmentDateAux.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new BadRequestException(
        'Los turnos solo pueden agendarse de lunes a viernes',
      );
    }

    // Validar si la hora está entre las 8:00 AM y las 6:00 PM
    const hour = appointmentDateAux.getHours();
    if (hour < 8 || hour >= 18) {
      throw new BadRequestException(
        'Los turnos solo pueden agendarse entre las 8:00 AM y las 6:00 PM',
      );
    }

    // Buscar el servicio en la base de datos usando el nombre del servicio
    const service = await this.serviceRepository.findOne({
      where: { name: createAppointmentDto.serviceName },
    });

    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    // Validar si hay otro turno en el mismo horario para el mismo servicio
    const isAvailable = await this.checkAppointmentAvailability(
      appointmentDateAux,
      service.id,
    );
    if (!isAvailable) {
      throw new BadRequestException(
        `El turno que quiere reservar para el servicio de ${service.name} no está disponible para ese horario.`,
      );
    }

    // Crear el turno asociado al usuario autenticado
    const appointment = this.appointmentRepository.create({
      appointmentDate: createAppointmentDto.appointmentDate,
      status: AppointmentStatus.RESERVED,
      user: { id: user.userId }, // Asociar el turno al usuario logueado
      service,
    });

    const savedAppointment = await this.appointmentRepository.save(appointment);

    const appointmentDate = new Date(savedAppointment.appointmentDate);
    const formattedDate = appointmentDate.toLocaleDateString('es-ES', {
      timeZone: 'UTC',
    });
    const formattedTime = appointmentDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    });

    const message = `${user.name} ha reservado un turno de ${service.name} a las ${formattedTime} con fecha ${formattedDate} exitosamente!`;

    return {
      message,
      appointmentId: appointment.id, // Devuelve el ID del appointment
      serviceId: service.id, // Devuelve el ID del servicio
      userId: user.userId, // Devuelve el ID del usuario autenticado
      serviceName: service.name, // Devuelve el nombre del servicio
      userName: user.name, // Devuelve el nombre del usuario autenticado
    };
  }
  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { isDeleted: false }, // Excluir los turnos eliminados
      relations: ['user', 'service'],
    });
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'service'], // Incluye relaciones para devolver datos completos
    });

    if (!appointment) {
      throw new Error('Turno no encontrado');
    }

    // Convertir el estado a un valor válido del enum AppointmentStatus
    if (status === 'reserved' || status === 'canceled') {
      appointment.status = status as AppointmentStatus; // Asigna el valor del enum
    } else {
      throw new Error('Estado no válido');
    }

    return await this.appointmentRepository.save(appointment); // Guarda el turno con el nuevo estado
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new Error('Turno no encontrado');
    }

    // Borrado lógico
    appointment.isDeleted = true;
    await this.appointmentRepository.save(appointment);
  }

  async getUserAppointments(userId: string) {
    const currentDate = new Date();

    // Turnos agendados (futuros)
    const scheduledAppointments = await this.appointmentRepository.find({
      where: {
        user: { id: userId },
        appointmentDate: MoreThan(currentDate),
        isDeleted: false, // Excluir turnos eliminados
      },
      relations: ['service'],
    });

    // Turnos históricos (pasados)
    const historicalAppointments = await this.appointmentRepository.find({
      where: {
        user: { id: userId },
        appointmentDate: LessThanOrEqual(currentDate),
        isDeleted: false, // Excluir turnos eliminados
      },
      relations: ['service'],
    });

    return {
      scheduledAppointments,
      historicalAppointments,
    };
  }

  // Método para verificar disponibilidad de turnos
  async checkAppointmentAvailability(date: Date, serviceId: string) {
    const startTime = new Date(date);
    const endTime = new Date(date);
    endTime.setHours(startTime.getHours() + 1);

    // Verificar si hay citas agendadas para el mismo servicio en el mismo horario
    const existingAppointments = await this.appointmentRepository.find({
      where: {
        appointmentDate: Between(startTime, endTime),
        service: { id: serviceId }, // Filtro por servicio
      },
    });

    return existingAppointments.length === 0;
  }
}
