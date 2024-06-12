import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthentificationService } from 'src/authentification/authentification.service';


@Controller()
export class AuthentificationController {
  constructor(private authService: AuthentificationService) {}

  @Post('login')
  async login(@Body() body: any, @Res() res: any) {
    
    if (!body.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    };
    if (!body.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    };

    const token = await this.authService.login(body.email, body.password); 
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(HttpStatus.OK).send('You are logged in');

  };

}
