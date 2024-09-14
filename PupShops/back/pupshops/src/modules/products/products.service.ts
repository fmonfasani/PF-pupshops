import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  getOneProduct(id: string) {
    return this.productsRepository.getOneProduct(id);
  }

  updateProduct(id: string, product) {
    return this.productsRepository.updateProducts(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProducts(id);
  }

  addProduct() {
    return 'This action adds a new product';
  }
}
