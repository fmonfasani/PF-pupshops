import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}