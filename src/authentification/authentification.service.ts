import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/domain/models/user/user.model';
require('dotenv').config();


@Injectable()
export class AuthentificationService {

    constructor(
      private usersService: UserService,
      private jwtService: JwtService,
    ){};


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
      };
    };


    async getUserLogged(req: Request): Promise <User>{

      const authHeader = req.headers['authorization'];
      const token = authHeader.substring(7); 
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return await this.usersService.getUserById(+decodedToken.sub)

    };


};
