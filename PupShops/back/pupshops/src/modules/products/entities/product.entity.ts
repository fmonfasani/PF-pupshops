import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/categories.entity';
import { OrderDetails } from '../../order/entities/order-detail.entity';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 500,
    unique: false,

    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    default: 'http',
  })
  imgUrl: string;

  @Column({
    type: 'varchar', 
    length: 10,
    nullable: true,
  })
  waist: string;
  
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  weight: string;

  //limite
  @Column({
    type: 'int',
    default: 10
  })
  threshold: number;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}


