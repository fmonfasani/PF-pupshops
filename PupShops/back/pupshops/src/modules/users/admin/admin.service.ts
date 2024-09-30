import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    try {
      let users = await this.usersRepository.find();
      const start = (page - 1) * limit;
      const end = start + +limit;

      users = users.slice(start, end);
      return users.map(({ password, ...user }) => user);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      console.log('Buscando usuario con email:', email);
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('Usuario encontrado:', user);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  async getEmailLogin(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      console.log(`Usuario encontrado: ${user}`);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar el usuario por email',
      );
    }
  }

  async getUserById(id: string): Promise<Partial<User> | string> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          orders: true,
        },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar el usuario por ID',
      );
    }
  }

  async createUser(user: AdminCreateUserDto): Promise<User> {
    try {
      const findUser = await this.getEmailLogin(user.email);
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

      const newUser = await this.usersRepository.save({
        ...user,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(
    id: string,
    user: AdminUpdateUserDto,
  ): Promise<Partial<User>> {
    try {
      await this.usersRepository.update(id, user);
      const updatedUser = await this.usersRepository.findOneBy({ id });
      if (!updatedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async deleteUser(id: string): Promise<string | Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.usersRepository.remove(user);
      return `Usuario ${user.name} ${user.lastname} eliminado exitosamente`;
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
