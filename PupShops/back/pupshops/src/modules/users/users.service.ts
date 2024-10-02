import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
 
  async getEmailLogin(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if(!user){console.log("Usuario no encontrado/Mail disponible");
    }
    else{
      console.log(`usuario encontrado ${user}`);

    }
    return user;
  }
  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<Partial<User>> {
    const { confirmPassword, ...userWithoutConfirmPassword } = user;

    await this.usersRepository.update(id, userWithoutConfirmPassword);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
  async deleteUser(id: string): Promise<Partial<User>|string> {
    const user = await this.usersRepository.findOneBy({ id });
    user.isActive = false
    this.usersRepository.save(user)
    return "Usuario eliminado"

   
  }
}
