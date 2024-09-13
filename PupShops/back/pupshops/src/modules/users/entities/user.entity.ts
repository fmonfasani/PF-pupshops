import { Order } from 'src/modules/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'USERS',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @Column({ type: 'bigint' })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'text' })
  address: string;

<<<<<<< HEAD
  /*  @OneToMany(() => Order, (order) => order.user)
=======
  @OneToMany(() => Order, (order) => order.user)
>>>>>>> 82de18135728514f96e9667ab1bff9ece2a06abb
  @JoinColumn({ name: 'orders_id' })
  orders: Order[];

  /* @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinColumn({ name: 'appointments_id' })
  appointments: Appointment[]; */
}
