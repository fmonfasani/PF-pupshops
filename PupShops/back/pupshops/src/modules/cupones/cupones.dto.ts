import { IsString, IsNotEmpty, IsNumber, IsDate, Min, Max, IsUUID } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number; 

  @IsDate()
  expiryDate: Date;

  @IsNumber()
  @Min(0)
  minimumOrderValue: number;

  @IsNumber()
  @Min(1)
  maxUses: number;

  @IsUUID()
  userId?: string; 
}