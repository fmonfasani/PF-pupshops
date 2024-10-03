import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Asunto del ticket',
    example: 'Problema con la cuenta',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Mensaje detallado del ticket',
    example: 'No puedo acceder a mi cuenta desde hace 2 días.',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
