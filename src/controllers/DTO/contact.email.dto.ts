import { IsEmail, IsString } from 'class-validator';

export class ContactEmailDto {

  @IsString()
  name: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

}
