import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

require('dotenv').config();



@Injectable()
export class AuthentificationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email); 
    const userPassword = user.getPassword();
    if (user && await bcrypt.compare(password, userPassword)) { 
      return user;
    };
    return null;
  };


  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); 
    if (!user) {
      return { message: 'Invalid credentials' }; 
    }
    const payload = { email: user.getEmail() , sub: user.getId()};
    return this.jwtService.sign(payload);
  };
};
