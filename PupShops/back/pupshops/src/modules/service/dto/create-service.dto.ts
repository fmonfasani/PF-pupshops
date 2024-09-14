/* eslint-disable prettier/prettier */
// src/service/dto/create-service.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string; // El nombre será 'peluquería', 'baño' o 'veterinaria'
}
