/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Fecha y hora del turno',
    example: '2024-09-14T10:00:00Z',
  })
  appointmentDate: Date;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del servicio en formato UUID', //UUID del Servicio
    example: 'a9117bf4-1cf7-43d3-a07c-4de1df18252b',
  })
  service: string;
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del usuario en formato UUID', //UUID del usuario
    example: 'fe165c21-92bb-4066-bc98-2f0bfa999944',
  })
  userId: string;
}
