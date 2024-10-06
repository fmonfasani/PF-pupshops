import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID de la orden de compra',
    example: '73b56cfb-d8e5-4097-b93e-e3b59de0e4f3',
  })
  @IsUUID()
  orderId: string;

  @ApiPropertyOptional({
    description: 'Título del producto o servicio',
    example: 'Pelota interactiva para gatos',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Cantidad de ítems',
    example: 1,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Precio unitario del ítem',
    example: 10.99,
  })
  @IsNumber()
  unit_price: number;

  @ApiProperty({
    description: 'Tipo de transacción: producto o servicio',
    example: 'product',
  })
  @IsString()
  type: 'product' | 'service';
}
