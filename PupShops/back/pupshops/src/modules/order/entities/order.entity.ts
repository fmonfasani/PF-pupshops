import{ Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderDetails } from './order-detail.entity';

@Entity({
    name: 'orders',
})
export class Orders{
    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        description:'Debe ser una fecha de tipo dd/mm/yy',
        example: "27/08/2024"
    })
    @Column()
    date: Date;

    @OneToOne(()=> OrderDetails, (orderDetail)=> orderDetail.order)
    orderDetails: OrderDetails;

    @ManyToOne(()=>User, (user)=>user.orders)
    @JoinColumn({ name: 'user_id' })
    user:User;
}
