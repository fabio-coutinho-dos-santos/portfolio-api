import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../../core/dtos/users/create-user.dto';
import { UpdateUserDto } from '../../core/dtos/users/update-user.dto';
import { UserRepositoryInterface } from '../../core/interfaces/user.repository.interface';
import { User } from '../../core/entities/user.entity';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new BadRequestException('Password and Confirm Passwort not match');
    }
    const user = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await hashSync(createUserDto.confirmPassword, genSaltSync(10)),
    };
    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
