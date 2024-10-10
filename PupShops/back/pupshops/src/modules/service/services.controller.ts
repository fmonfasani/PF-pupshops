import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServicePriceDto } from './dto/update-price.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/roles.enum';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los servicios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios disponibles',
    schema: {
      example: [
        {
          id: 'f4fae94e-bac7-46ed-b06d-18c1a83db8c7',
          name: 'peluquería canina',
          deletedAt: null,
          price: '100.00',
        },
      ],
    },
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Agregar servicios desde un seeder' })
  addProducts() {
    return this.servicesService.addServicesSeeder();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener un servicio por ID' })
  @ApiResponse({
    status: 200,
    description: 'El servicio con el ID proporcionado',
    schema: {
      example: {
        id: 'f4fae94e-bac7-46ed-b06d-18c1a83db8c7',
        name: 'peluquería canina',
        deletedAt: null,
        price: '100.00',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Eliminar un servicio por ID' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Patch(':id/restore')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Restaurar un servicio eliminado' })
  restore(@Param('id') id: string) {
    return this.servicesService.restore(id);
  }

  @Patch(':id/price')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar el precio de un servicio' })
  updatePrice(
    @Param('id') id: string,
    @Body() updateServicePriceDto: UpdateServicePriceDto,
  ) {
    return this.servicesService.updatePrice(id, updateServicePriceDto);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear un nuevo servicio' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }
}
