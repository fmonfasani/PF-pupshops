import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from '../order/entities/order.entity';
import { IsOptional } from 'class-validator';

@Entity('cupones')
export class Cupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'decimal' })
  discount: number; 

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  expiryDate: Date;

  @Column({ nullable: true })
  minimumOrderValue: number; 

  @Column({ type: 'int', default: 1 })
  maxUses: number; 

  @Column({ type: 'int', default: 0 })
  currentUses: number; 

  @Column({ type: 'uuid', nullable: true })
  userId?: string; 

  @IsOptional()
  @ManyToOne(() => Orders, (orders)=> orders.cupon)
  @JoinColumn({name:'Order_id'})
  order:Orders
}