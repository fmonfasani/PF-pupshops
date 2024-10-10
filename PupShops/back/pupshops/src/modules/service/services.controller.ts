/* eslint-disable prettier/prettier */
// src/service/services.controller.ts
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateServicePriceDto } from './dto/update-price.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/roles.enum';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Services')
@ApiBearerAuth()

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }
  @Get('seeder')
  addProducts() {
    return this.servicesService.addServicesSeeder();
  }
  @Get()
 
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }
  @Delete(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
  @Patch(':id/restore')
  @ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  restore(@Param('id') id: string) {
    return this.servicesService.restore(id);
  }

  @Patch(':id/price')
  @ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  updatePrice(
    @Param('id') id: string,
    @Body() updateServicePriceDto: UpdateServicePriceDto,
  ) {
    return this.servicesService.updatePrice(id, updateServicePriceDto);
  }
}
