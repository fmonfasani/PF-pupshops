// src/appointment/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../service/entities/services.entity';

export enum AppointmentStatus {
  RESERVED = 'reserved',
  CANCELED = 'canceled',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.RESERVED,
  })
  status: AppointmentStatus;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Service, (service) => service.appointments, {
    nullable: true,
  })
  service?: Service;
}
