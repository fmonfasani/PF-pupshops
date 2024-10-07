import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    this.name = this.name.toLowerCase();
  }
}
