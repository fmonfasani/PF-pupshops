import { IsString, IsNotEmpty, IsNumber, IsDate, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({
    description: 'Código del cupón',
    example: 'DESCUENTO10',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Porcentaje de descuento del cupón',
    example: 10,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number; 

  @ApiProperty({
    description: 'Fecha de expiración del cupón',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDate()
  expiryDate: Date;

  @ApiProperty({
    description: 'Valor mínimo del pedido para aplicar el cupón',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  minimumOrderValue: number;

  @ApiProperty({
    description: 'Número máximo de usos del cupón',
    example: 100,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  maxUses: number;

  @ApiProperty({
    description: 'ID del usuario que puede usar el cupón (opcional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  userId?: string; 
}
