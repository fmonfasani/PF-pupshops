import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ): Promise<Appointment> {
    // Buscar el usuario en la base de datos usando el userId del DTO
    const user = await this.userRepository.findOneBy({
      id: createAppointmentDto.userId,
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Buscar el servicio en la base de datos usando el serviceId del DTO
    const service = await this.serviceRepository.findOneBy({
      id: createAppointmentDto.service,
    });
    if (!service) {
      throw new Error('Servicio no encontrado');
    }

    // Crear la cita (appointment)
    const appointment = this.appointmentRepository.create({
      appointmentDate: createAppointmentDto.appointmentDate,
      status: AppointmentStatus.RESERVED, // Usa el enum en lugar del string
      user: user, // Relaciona correctamente el usuario
      service: service, // Relaciona correctamente el servicio
    });

    // Guardar la cita en la base de datos
    return await this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['user', 'service'],
    });
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (appointment) {
      // Convertir la cadena en un valor válido del enum AppointmentStatus
      if (status === 'reserved' || status === 'canceled') {
        appointment.status = status as AppointmentStatus; // Asignar el valor del enum
        return this.appointmentRepository.save(appointment);
      } else {
        throw new Error('Estado no válido'); // Manejar valores no válidos
      }
    }

    return null;
  }

  async remove(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}

/*
  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ relations: ['user', 'service'] });
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (appointment) {
      appointment.status = status;
      return this.appointmentRepository.save(appointment);
    }
    return null;
  }

  async remove(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}












  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
*/
