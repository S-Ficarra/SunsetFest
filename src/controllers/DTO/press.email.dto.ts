import { IsEmail, IsString, IsUrl } from 'class-validator';

export class PressEmailDto {

  @IsString()
  journalistName: string;

  @IsString()
  mediaName: string;

  @IsEmail()
  email: string;

  @IsUrl()
  mediaLink: string;

}
