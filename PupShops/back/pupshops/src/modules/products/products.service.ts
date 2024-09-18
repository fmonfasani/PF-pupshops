import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  getOneProduct(id: string) {
    return this.productsRepository.getOneProduct(id);
  }

  updateProduct(id: string, product: Products) {
    return this.productsRepository.updateProducts(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProducts(id);
  }

  addProduct() {
    return this.productsRepository.addProducts();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    return this.productsRepository.createProduct(createProductDto);
  }
}
