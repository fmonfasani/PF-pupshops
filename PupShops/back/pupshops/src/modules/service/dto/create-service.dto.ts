import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50) // Valida que el nombre tenga entre 3 y 50 caracteres
  @ApiProperty({
    description: 'El nombre del servicio',
    example: 'peluquería',
  })
  name: string; // Puede ser 'peluquería', 'baño', 'veterinaria', etc.

  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // El precio debe ser un número positivo
  @ApiProperty({
    description: 'El precio del servicio',
    example: 100.0,
  })
  price: number;
}
