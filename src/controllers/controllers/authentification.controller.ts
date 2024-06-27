import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthentificationService } from '../../authentification/authentification.service';
import { loginDto } from '../DTO/login.dto';


@Controller()
export class AuthentificationController {
  constructor(private authService: AuthentificationService) {}

  @Post('login')
  async login(@Body() loginDto: loginDto, @Res() res: any) {
    
    const token = await this.authService.login(loginDto.email, loginDto.password); 

    if (token) {
      res.setHeader('Authorization', `Bearer ${token}`);
      return res.status(HttpStatus.OK).send('You are logged in');
    };

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

  };

};
