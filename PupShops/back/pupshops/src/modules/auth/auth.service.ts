import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
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
    try {
      const findUser = await this.usersService.getEmailLogin(user.email);
      if (findUser) {
        if (findUser.isActive === false) {
          throw new BadRequestException('Cuenta inhabilitada');
        }
        throw new BadRequestException('Email existente');
      }
      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden');
      }

      const hashedPassword = await bcryptjs.hash(user.password, 10);
      if (!hashedPassword) {
        throw new InternalServerErrorException('Error en la encriptación de la contraseña');
      }

      console.log('Datos antes de guardar:', {
        ...user,
        password: hashedPassword,
      });

      const newUser = await this.usersService.createUser({
        ...user,
        password: hashedPassword,
        isActive: true,
      });

      delete newUser.password;
      delete newUser.isActive;

      return JSON.stringify(`Cuenta creada correctamente ${newUser.name} ${newUser.lastname}`) 
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async signIn(login: LoginUserDto) {
    try {
      const findUser = await this.usersService.getEmailLogin(login.email);

      if (!findUser) {
        throw new BadRequestException('Email y/o contraseña incorrectos');
      }

      if (findUser.isActive === false) {
        throw new BadRequestException('Cuenta inhabilitada');
      }

      console.log('Usuario encontrado:', findUser.email);

      const comparedPasswords = await bcryptjs.compare(
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
      return { success: 'Usuario logeado correctamente', token, findUser };
    } catch (error) {
      throw new BadRequestException('Error en el proceso de autenticación');
    }
  }
}
