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

  // Asegúrate de usar timestamp with time zone si trabajas con zonas horarias.
  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.RESERVED,
  })
  status: AppointmentStatus;

  // Relación con el usuario que creó la cita
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  // Relación con el servicio al que pertenece la cita
  @ManyToOne(() => Service, (service) => service.appointments, {
    nullable: true, // Permite que una cita no esté asociada a un servicio opcionalmente
  })
  service?: Service;

  // Borrado lógico, marcará como eliminado sin borrar la fila de la base de datos
  @Column({ default: false })
  isDeleted: boolean;
}
