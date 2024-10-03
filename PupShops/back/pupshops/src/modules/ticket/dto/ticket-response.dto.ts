import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketResponseDto {
  @IsNotEmpty()
  @IsString()
  response: string;

  @IsNotEmpty()
  responderId: string; 
}