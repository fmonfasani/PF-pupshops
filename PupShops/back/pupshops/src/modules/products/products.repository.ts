import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Categories } from "../categories/categories.entity";




@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>)
    {}

    async getAllProducts(page: number, limit: number):Promise<Products[]>{
        let products = await this.productsRepository.find({
            relations:{
                category: true,
            },
        });
        const start = (page - 1)*limit;
        const end = start + limit;
        products = products.slice(start, end);

        return products;
    }

    async getOneProduct(id:string):Promise<Products>{
        const product = await this.productsRepository.findOneBy({id})

        if(!product){
            throw new NotFoundException(`Producto con id ${id} no encontrado`)
        }

        return product;
    }

    
    async updateProducts(id:string, product:Products){
        await this.productsRepository.update(id,product);
        const updateProduct = await this.productsRepository.findOneBy({id})
        return updateProduct;
    }
    
    async deleteProducts(id:string):Promise<void>{
        const product = await this.productsRepository.findOneBy({id})

        if(!product){
            throw new NotFoundException(`Producto con id ${id} no encontrado`)
        }

        await this.productsRepository.delete(id);
    }

    /*
    async addProducts(){
        const categories = await this.categoriesRepository.find();

        data?.map(async(element)=>{
            const category = categories.find(
                (category) => category.name === element.category,
            );
            const product = new Products();

            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category= category;

            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Products)
            .values(product)
            .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
            .execute();
        });
        return 'Productos Agregados'
    }
    */
}
