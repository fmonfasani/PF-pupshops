import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/product.entity";
import { Repository } from "typeorm";



@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>){}

    getProducts(){}

    getOneProduct(){}

    addProducts(){}

    updateProducts(){}

    deleteProducts(){}
}
