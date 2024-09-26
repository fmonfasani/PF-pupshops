import { IsNumber, IsString, IsUUID } from 'class-validator';

export class PaymentStatusDto {
  @IsUUID()
  paymentId: string;

  @IsString()
  status: string; // 'approved', 'pending', 'rejected'

  @IsNumber()
  totalAmount: number;

  @IsString()
  currency: string;

  @IsUUID()
  orderId: string;
}