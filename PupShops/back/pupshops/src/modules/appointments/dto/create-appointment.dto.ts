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
    description: 'ID del servicio (peluquería, baño o veterinaria)',
    example: 'uuid-del-servicio',
  })
  service: string;
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del usuario',
    example: 'uuid-del-usuario',
  })
  userId: string;
}
