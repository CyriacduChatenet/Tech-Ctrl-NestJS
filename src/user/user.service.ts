import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { SignupUserInputDTO } from './dto/signup-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(signupUserDto: SignupUserInputDTO): Promise<User> {
    try {
      return await this.userRepository.createUser(signupUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(queries) {
    try {
      return await this.userRepository.findAllUser(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneUserByEmail(email);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, signupUserDto: UpdateUserDTO | unknown) {
    try {
      return await this.userRepository.updateUser(id, signupUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.removeUser(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
