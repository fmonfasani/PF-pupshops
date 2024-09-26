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
    user: User,
  ): Promise<{
    message: string;
    appointmentId: string;
    serviceId: string;
    serviceName: string;
    userId: string;
    userName: string;
  }> {
    const { appointmentDate, appointmentTime, serviceName } =
      createAppointmentDto;

    // Combinar la fecha y la hora en un objeto Date
    const combinedDateTime = new Date(
      `${appointmentDate}T${appointmentTime}:00`,
    );

    // Buscar el servicio en la base de datos usando el nombre del servicio
    const service = await this.serviceRepository.findOne({
      where: { name: serviceName },
    });

    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    // Validar si hay otro turno en el mismo horario para el mismo servicio
    const isAvailable = await this.checkAppointmentAvailability(
      combinedDateTime,
      service.id,
    );
    if (!isAvailable) {
      throw new BadRequestException(
        `El turno que quiere reservar para el servicio de ${service.name} no está disponible para ese horario.`,
      );
    }

    const fullUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    console.log('Usuario completo:', fullUser);

    if (!fullUser) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Crear el turno asociado al usuario autenticado
    const appointment = this.appointmentRepository.create({
      appointmentDate: combinedDateTime,
      status: AppointmentStatus.RESERVED,
      user: { id: user.id }, // Usar el id del usuario autenticado
      service,
    });

    const savedAppointment = await this.appointmentRepository.save(appointment);

    return {
      message: `UD. Se ha reservado un turno de ${service.name} a las ${combinedDateTime.toLocaleTimeString()} con fecha ${combinedDateTime.toLocaleDateString()} exitosamente!`,
      appointmentId: appointment.id,
      serviceId: service.id,
      serviceName: service.name,
      userId: user.id,
      userName: user.name,
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
