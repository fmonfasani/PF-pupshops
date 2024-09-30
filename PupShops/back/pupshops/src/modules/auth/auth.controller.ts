import { Controller, Post, Body, HttpCode, Req, Get } from '@nestjs/common';

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

/*   @Get('/auth0/login')
  getAuth0Protected(@Req() req:Request){
    console.log(req.oidc);    
    return JSON.stringify(req.oidc.user)
  } */
}
