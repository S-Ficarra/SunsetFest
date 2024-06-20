import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthentificationService } from 'src/authentification/authentification.service';
import { loginDto } from '../DTO/login.dto';


@Controller()
export class AuthentificationController {
  constructor(private authService: AuthentificationService) {}

  @Post('login')
  async login(@Body() loginDto: loginDto, @Res() res: any) {
    
    const token = await this.authService.login(loginDto.email, loginDto.password); 

    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    };

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(HttpStatus.OK).send('You are logged in');

  };

};
