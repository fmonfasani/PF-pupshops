import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async getUsers(page: number, limit: number) {
    let users = await this.usersRepository.find();
    const start = (page - 1) * limit;
    const end = start + +limit;

    users = users.slice(start, end);
    return users.map(({ password, ...user }) => user);
  }

  async getUserByEmail(email: string): Promise<Partial<User>> {
    console.log('Buscando usuario con email:', email);
    const user = this.usersRepository.findOneBy({ email });
    console.log('Usuario encontrado:', user);
    return user;
  }
  async getUserById(id: string): Promise<Partial<User> | string> {
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
  }

  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  async updateUser(
    id: string,
    user: Partial<CreateUserDto>,
  ): Promise<Partial<User>> {
    const { confirmPassword, ...userWithoutConfirmPassword } = user;

    await this.usersRepository.update(id, userWithoutConfirmPassword);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
  async deleteUser(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
