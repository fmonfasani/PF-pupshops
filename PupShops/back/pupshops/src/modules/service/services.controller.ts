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
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateServicePriceDto } from './dto/update-price.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.servicesService.restore(id);
  }

  @Patch(':id/price')
  updatePrice(
    @Param('id') id: string,
    @Body() updateServicePriceDto: UpdateServicePriceDto,
  ) {
    return this.servicesService.updatePrice(id, updateServicePriceDto);
  }
}
