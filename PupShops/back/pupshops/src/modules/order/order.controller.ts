import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/roles/roles.enum';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Orders')
@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    return await this.orderService.create(userId, products);
  }


  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async findAll() {
    return await this.orderService.findAll();
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
