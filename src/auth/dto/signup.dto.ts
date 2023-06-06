import { IsEmail, IsString } from "class-validator";

export class SignupDTO {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
