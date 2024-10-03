import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from '../../order/entities/order.entity';

@Entity('payments')
export class Payment {
  @PrimaryColumn({ type: 'varchar' }) // Cambiado de 'PrimaryGeneratedColumn' a 'PrimaryColumn' de tipo 'string'
  id: string; // Usar 'string' para manejar el ID largo que recibes de Mercado Pago

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  transactionAmount: number;

  @ManyToOne(() => Orders, (order) => order.payments, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
