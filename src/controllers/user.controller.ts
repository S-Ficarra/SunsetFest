import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/database/mappers/user.mapper';
import { User } from 'src/domain/models/user/user.model';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();



@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){};

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getAllUsers(): Promise<User | {}> {
        try {
            return await this.userService.getAllUsers();
        } catch (error) {
            return {message : error.message}; 
        }
    };

    @UseGuards(JwtAuthGuard)
    @Get('users/:id')
    async getUserById(@Param('id') id: number): Promise<User | {}> {      
        try {
            return await this.userService.getUserById(id);
        } catch (error) {
            return {message : error.message}; 
        };
    };

    @UseGuards(JwtAuthGuard)
    @Post('users/createuser')
    async createUser(@Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  createUserDto: CreateUserDto,@Req()req: Request): Promise<User | {}> {    

        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7); 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)
        
        const saltedPassword = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUNDS))
            try {
                const userToCreate = new User (
                    createUserDto.name,
                    createUserDto.firstName,
                    createUserDto.email,
                    saltedPassword,
                    createUserDto.role
                );
                return await this.userService.createUser(userLoggedIn, userToCreate);
            } catch (error) {
                return {message : error.message}; 
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/edit')
    async editUser(@Param('id') id: number, @Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  createUserDto: CreateUserDto, @Req()req: Request): Promise<User | {}> {    

        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7); 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)
        const userToEdit = await this.userService.getUserById(id);
        const saltedPassword = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUNDS))
        
            try {
                userToEdit.setName(createUserDto.name);
                userToEdit.setFirstName(createUserDto.firstName)
                userToEdit.setEmail(createUserDto.email)
                userToEdit.setPassword(saltedPassword)
                userToEdit.setRole(createUserDto.role)
                return await this.userService.editUser(userLoggedIn, userToEdit);
            } catch (error) {
                return {message : error.message}; 
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/deleteuser')
    async deleteUser(@Param('id')id: number, @Req()req: Request ): Promise<{}> {

        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7); 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)

        try {
            const userId = +id; // Convertir id en nombre
            const user = await this.userService.getUserById(id);
            if (!user) {
                return {message: `User ${userId} do not exist`};
            }
            await this.userService.deleteUser(userLoggedIn, id);
            return {message: `User ${userId} deleted`};
        } catch (error) {
            return {message : error.message}; 
        };        
    };





    

};
