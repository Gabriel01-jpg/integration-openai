import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
