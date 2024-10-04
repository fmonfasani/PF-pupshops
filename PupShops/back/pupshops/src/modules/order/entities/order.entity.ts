import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './order-detail.entity';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Payment } from '../../payments/entities/payment.entity';
import { IsOptional } from 'class-validator';
import { Cupon } from '../../cupones/cupones.entity';


@Entity({
  name: 'orders',
})
export class Orders {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha de tipo dd/mm/yy',
    example: '27/08/2024',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @IsOptional()
  @OneToMany(()=> Cupon , (cupon) => cupon.order)
  @JoinColumn({name: 'Cupon'})
  cupon: Cupon[]

 
  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;
}
