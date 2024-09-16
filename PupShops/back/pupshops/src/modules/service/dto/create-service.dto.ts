/* eslint-disable prettier/prettier */
// src/service/dto/create-service.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El nombre del servicio',
    example: 'peluquería',
  })
  name: string; // El nombre será 'peluquería', 'baño' o 'veterinaria'
}
