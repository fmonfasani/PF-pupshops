/* eslint-disable prettier/prettier */
// src/service/services.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from './entities/services.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentsService } from '../appointments/appointments.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service,Appointment,User])],
  controllers: [ServicesController],
  providers: [ServicesService, AppointmentsService],
})
export class ServicesModule {}
