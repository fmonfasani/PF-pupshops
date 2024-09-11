import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductsService {
  createProduct() {
    return 'This action adds a new product';
  }

  findAllProducts() {
    return `This action returns all products`;
  }

  findOneProduct(id: number) {
    return `This action returns a #${id} product`;
  }

  updateProduct(id: number) {
    return `This action updates a #${id} product`;
  }

  removeProduct(id: number) {
    return `This action removes a #${id} product`;
  }
}
