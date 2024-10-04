import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Proporciona el mail con el cual te registraste',
    example: 'juansanchez@ejemplo.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Proporciona tu contraseña',
    example: 'Palabra1*',
  })
  password: string;
}
