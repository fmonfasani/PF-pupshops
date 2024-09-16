// src/appointment/appointment.module.ts
import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Service } from '../../modules/service/entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Service])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentModule {}
