import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/roles/roles.enum';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() request: any, @Body() createOrderDto: CreateOrderDto) {
    console.log('Datos de la solicitud:', createOrderDto);

    // Extraer userId desde request.user
    const userId = request.user.id; // Asegúrate de que request.user tenga la propiedad id
    const { products } = createOrderDto; // Obtener solo los productos desde el DTO
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
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
