import { Categories } from '../../categories/categories.entity';
import { OrderDetail } from '../../order/entities/order-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
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

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({
    type: 'text',
    default: 'http',
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => Categories, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetail[];
}
