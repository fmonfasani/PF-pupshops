import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page && limit) return this.productsService.getAllProducts(page, limit);
    return this.productsService.getAllProducts(page, limit);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProduct();
  }

  @Get(':id')
  findOneProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getOneProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
