import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';

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
      throw new InternalServerErrorException('Error al buscar el usuario por email');
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
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el usuario por ID');
    }
  }

  async createUser(user: AdminCreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersRepository.save(user);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(id: string, user: AdminUpdateUserDto): Promise<Partial<User>> {
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