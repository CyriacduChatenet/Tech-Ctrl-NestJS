import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SigninDTO } from './dto/signin.dto';
import { UserService } from '../user/user.service';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  public async signin(user: SigninDTO) {
    try {
      const findUser = await this.userService.findOneByEmail(user.email);

      if (!findUser) {
        throw new HttpException(`User isn't exist`, HttpStatus.NOT_ACCEPTABLE);
      }

      const payload = {
        email: findUser.email,
        id: findUser.id,
        roles: findUser.roles,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  public async signup(signupUserInputDTO: SignupUserInputDTO) {
    try {
      const userInDB = await this.userService.findOneByEmail(
        signupUserInputDTO.email,
      );

      if (userInDB) {
        throw new HttpException(
          'User is already exist',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const password = await bcrypt.hash(signupUserInputDTO.password, 10);

      const user = await this.userService.create({
        ...signupUserInputDTO,
        password,
        roles: signupUserInputDTO.roles,
      });

      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
