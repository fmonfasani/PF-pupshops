/* eslint-disable prettier/prettier */
// src/service/services.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Service } from './entities/services.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServicePriceDto } from './dto/update-price.dto';
//import * as mercadopago from 'mercadopago';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);

    try {
      return await this.servicesRepository.save(service);
    } catch (error) {
      // Manejar errores de restricción única (nombre duplicado)
      if (error.code === '23505') {
        throw new ConflictException(
          `El servicio con el nombre "${createServiceDto.name}" ya existe.`,
        );
      } else {
        // Manejar otros errores
        throw new InternalServerErrorException('Error al crear el servicio');
      }
    }
  }

  async updatePrice(
    id: string,
    updateServicePriceDto: UpdateServicePriceDto,
  ): Promise<Service> {
    const service = await this.findOne(id);
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }

    // Actualizar el precio del servicio
    service.price = updateServicePriceDto.price;
    return await this.servicesRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    // Solo devuelve los servicios que no están eliminados lógicamente
    return await this.servicesRepository.find({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string): Promise<Service> {
    // Busca un servicio que no esté marcado como eliminado
    const service = await this.servicesRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    return service;
  }

  async remove(id: string): Promise<{ message: string }> {
    const service = await this.findOne(id);
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    // Marcar el servicio como eliminado lógicamente
    service.deletedAt = new Date();
    await this.servicesRepository.save(service);
    return { message: 'Borrado lógico correctamente' };
  }

  async restore(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id, deletedAt: Not(null) },
    });
    if (!service) {
      throw new NotFoundException(
        `Servicio con id ${id} no encontrado o no eliminado`,
      );
    }
    service.deletedAt = null; // Restaurar el servicio
    return await this.servicesRepository.save(service);
  }
}
