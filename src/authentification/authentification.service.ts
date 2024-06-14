import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';

require('dotenv').config();



@Injectable()
export class AuthentificationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {};


  async login(email: string, password: string) {
    try {

      const user = await this.usersService.getUserByEmail(email); 
      const userPassword = user.getPassword();    
      const pass = await bcrypt.compare(password, userPassword)
      
      if (pass) { 
        const payload = { email: user.getEmail() , sub: user.getId()};
        return this.jwtService.sign(payload);
      } else {
        return null
      };
      
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    };
  };



};
