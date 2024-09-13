import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Proporciona el mail con el cual te registraste',
    example: 'johndoe@example.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Proporciona tu contraseña',
    example: 'Contraseña1234-',
  })
  password: string;
}
