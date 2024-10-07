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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 75,
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
  @ApiBearerAuth()
  @Roles(Role.Admin)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('child/:categoryId')
  getProductsByChildCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.getProductsByChildCategory(categoryId);
  }

  
  @Get('parent/:categoryId')
  getProductsByParentCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.getProductsByParentCategory(categoryId);
  }

  @Get('category/:categoryId')
  getProductsRecursive(@Param('categoryId') categoryId: string) {
    return this.productsService.getProductsRecursive(categoryId);
  }
}
