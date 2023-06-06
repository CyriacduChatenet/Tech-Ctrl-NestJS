import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  public async signin(@Body() signinUserInputDTO: SigninDTO) {
    return this.authService.signin(signinUserInputDTO);
  }

  @Post('signup')
  public signup(@Body() signupUserInputDTO: SignupDTO) {
    return this.authService.signup(signupUserInputDTO);
  }
}
