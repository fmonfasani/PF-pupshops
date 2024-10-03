import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  Length,
  IsStrongPassword,
  
  IsBoolean,
  IsOptional,
} from 'class-validator';


export class AdminCreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({
    description: 'Nombre (hasta 50 caracteres)',
    example: 'Juan',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({
    description: 'Apellido (hasta 50 caracteres)',
    example: 'Sanchez',
  })
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un email válido',
    example: 'juansanchez@ejemplo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    description:
      'La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial',
    example: 'Palabra1*',
  })
  password: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    description:
      'Corrobora que la confirmación sea igual a la contraseña proporcionada',
    example: 'Palabra1*',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Agrega tu codigo de área ',
    example: '543511111111',
  })
  phone: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'Máximo 20 caracteres',
    example: 'Inglaterra',
  })
  country: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'Máximo 20 caracteres',
    example: 'Londres',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    description: 'Máximo 80 caracteres',
    example: 'Calle 123',
  })
  address: string;

  @IsBoolean()
  isAdmin: boolean;
  @IsOptional()
  isActive:boolean
}
