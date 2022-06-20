import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userEmail)
      throw new ConflictException(
        `User with "${createUserDto.email}" email already exist`,
      );
    const user = new UserEntity();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    const result = await this.userRepository.save(user);
    const { password, ...userResponse } = result;
    return userResponse;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const { affected } = await this.userRepository.update(id, updateUserDto);
    if (!affected)
      throw new NotFoundException(`User with "${id}" id Not Found`);
    return `User with "${id}" id updated`;
  }
}
