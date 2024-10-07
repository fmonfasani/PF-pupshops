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
import * as serviceData from '../../utils/service.json';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentsService } from '../appointments/appointments.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);

    try {
      return await this.servicesRepository.save(service);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `El servicio con el nombre "${createServiceDto.name}" ya existe.`,
        );
      } else {
        throw new InternalServerErrorException('Error al crear el servicio');
      }
    }
  }

  async addServicesSeeder() {
    try {
      if (!Array.isArray(serviceData['default'])) {
        throw new Error(
          'El archivo JSON no contiene un array válido de servicios.',
        );
      }

      const servicesArray = serviceData['default'];

      for (const service of servicesArray) {
        try {
          await this.create({
            name: service.name,
            price: service.price,
          });
        } catch (error) {
          if (error instanceof ConflictException) {
            console.log(`El servicio "${service.name}" ya existe, se omite.`);
            continue;
          } else {
            throw error;
          }
        }
      }

      return 'Servicios agregados correctamente.';
    } catch (error) {
      console.error('Error al agregar servicios:', error.message);
      throw new InternalServerErrorException('Error al agregar los servicios');
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
    //
    return await this.servicesRepository.find({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    return service;
  }

  async remove(id: string): Promise<string> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }

    await this.servicesRepository.delete(id);
    return 'Servicio eliminado';
    try {
      await this.servicesRepository.delete(id);
      return 'Servicio eliminado';
    } catch (error) {
      console.error('Error al eliminar el servicio:', error.message);
      throw new InternalServerErrorException('Error al eliminar el servicio');
    }
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
    service.deletedAt = null;
    return await this.servicesRepository.save(service);
  }
}
