import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './loginUserDto';
import { Role } from './roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const findUser = await this.usersService.getUserByEmail(user.email);
    if (findUser) {
      throw new BadRequestException('Email existente');
    }
    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new Error('Error en la encriptación de la contraseña');
    }
    console.log('Datos antes de guardar:', {
      ...user,
      password: hashedPassword,
    });

    const newUser = await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });
    delete newUser.password;

    return newUser;
  }

  async signIn(login: LoginUserDto) {
    const findUser = await this.usersService.getUserByEmail(login.email);
    console.log('Usuario encontrado:', findUser);
    if (!findUser) {
      throw new BadRequestException('Email y/o contraseña incorrectos');
    }

    const comparedPasswords = await bcrypt.compare(
      login.password,
      findUser.password,
    );
    if (!comparedPasswords) {
      throw new BadRequestException('Email y/o contraseña incorrectos');
    }

    const userPayload = {
      sub: findUser.name,
      id: findUser.id,
      email: findUser.email,
      roles: [findUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);
    return { success: 'Usuario logeado correctamente', token };
  }
}
