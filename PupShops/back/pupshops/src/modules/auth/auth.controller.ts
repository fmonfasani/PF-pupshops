import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './loginUserDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  @HttpCode(201)
  async signUp(
    @Body() user: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    delete user.isAdmin;

    console.log('Usuario creado a las: ', request.now);
    const nuevoUsuario = await this.authService.signUp(user);
    return plainToClass(CreateUserDto, nuevoUsuario, {
      excludeExtraneousValues: true,
    });
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() login: LoginUserDto) {
    return this.authService.signIn(login);
  }
}
