import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketResponseDto {
  @ApiProperty({
    description: 'Respuesta del ticket',
    example: 'Hemos resuelto su problema de acceso.',
  })
  @IsNotEmpty()
  @IsString()
  response: string;

  @ApiProperty({
    description: 'ID del usuario que responde al ticket',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  responderId: string; 
}
