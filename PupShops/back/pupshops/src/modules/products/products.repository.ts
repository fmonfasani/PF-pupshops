import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({
    name: 'products',
})
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id:string;


    @Column({
        type: 'varchar',
        length: 100,
        unique:true,
        nullable:false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description:string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable:false,
    })
    price:number;

    @Column({
        type: 'int',
        nullable:false
    })
    stock:number;

    @Column({
        type: 'text',
        default: 'http'
    })
    imgUrl: string;
}