import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha tipo dd/mm/yy',
    example: '11/09/2024',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
