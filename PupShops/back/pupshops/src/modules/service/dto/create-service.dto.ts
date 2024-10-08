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
  @Length(3, 50)
  @ApiProperty({
    description: 'El nombre del servicio',
    example: 'peluquería',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'El precio del servicio',
    example: 100.0,
  })
  price: number;
}
