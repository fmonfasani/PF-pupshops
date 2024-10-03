import { Controller, Post, Body, HttpCode, Req, Get, InternalServerErrorException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './loginUserDto';
import { Request } from 'express';

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
    try {
      console.log('Usuario creado a las: ', request.now);
      const nuevoUsuario = await this.authService.signUp(user);
      return plainToClass(CreateUserDto, nuevoUsuario, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error en el proceso de registro');
    }
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() login: LoginUserDto) {
    try {
      return await this.authService.signIn(login);
    } catch (error) {
      throw new InternalServerErrorException('Error en el inicio de sesión');
    }
  }

  @Get('/auth0/login')
  getAuth0Protected(@Req() req: Request) {
    try {
      console.log(req.oidc);
      return JSON.stringify(req.oidc.user);
    } catch (error) {
      throw new InternalServerErrorException('Error en la autenticación de Auth0');
    }
  }
}
