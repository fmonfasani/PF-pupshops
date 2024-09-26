import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  orderId: string;

  @IsNumber()
  totalAmount: number; // Monto total a pagar

  @IsString()
  title: string; // Título del ítem que se está comprando

  @IsString()
  type: 'product' | 'service'; // Nuevo campo para diferenciar si es un producto o servicio
}
