import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Fecha del turno (formato YYYY-MM-DD)',
    example: '2024-09-25',
  })
  appointmentDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Hora del turno (formato HH:mm)',
    example: '10:00',
  })
  appointmentTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Peluquería',
  })
  serviceName: string;
}
