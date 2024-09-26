import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../order/entities/order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status: string; // Estado del pago: 'approved', 'pending', 'rejected'

  @Column({ type: 'varchar', length: 50, nullable: false })
  paymentMethod: string; // Tipo de pago: 'credit_card', 'cash', etc.

  @Column('decimal', { precision: 10, scale: 2 })
  transactionAmount: number;

  @Column({ type: 'varchar', length: 100 })
  email: string; // Correo del usuario que realizó el pago

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  external_reference: string; // Referencia externa con el orderID

  @ManyToOne(() => Orders, (order) => order.payments, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
