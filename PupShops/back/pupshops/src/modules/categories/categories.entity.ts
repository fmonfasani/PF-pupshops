import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../products/entities/product.entity';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(() => Categories, (category) => category.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Categories;

  @OneToMany(() => Categories, (category) => category.parent)
  children: Categories[];

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}

