import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/database/mappers/user.mapper';
import { User } from 'src/domain/models/user/user.model';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { AuthentificationService } from 'src/authentification/authentification.service';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();



@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService : AuthentificationService
    ){};

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    };


    @UseGuards(JwtAuthGuard)
    @Post('createuser')
    async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto,@Req()req: Request): Promise<any> {    

        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7); 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userLoggedin = await this.userService.getUserById(+decodedToken.sub)
        
        const saltedPassword = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUNDS))
            try {
                const userToCreate = new User (
                    createUserDto.name,
                    createUserDto.firstName,
                    createUserDto.email,
                    saltedPassword,
                    createUserDto.role
                );
                return await this.userService.createUser(userLoggedin, userToCreate);
            } catch (error) {
                return {message : error.message}; 
            };
    };
};
