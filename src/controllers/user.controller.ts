import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserDto } from './DTO/user.dto';
import { User } from 'src/domain/models/user/user.model';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { AuthentificationService } from 'src/authentification/authentification.service';
import { mapUserDtoTomodelEdit, mapUserDtotoModelCreate } from './mappers/user.mapper';
require('dotenv').config();



@Controller()
export class UserController {


    constructor(
        private readonly userService: UserService,
        private readonly authService : AuthentificationService
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getAllUsers(): Promise<User | {}> {
        try {
            return await this.userService.getAllUsers();
        } catch (error) {
            return {message : error.message}; 
        };
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
    async createUser(@Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  createUserDto: UserDto, @Req()req: Request): Promise<User | {}> {    

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const saltedPassword = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUNDS))
            const userToCreate = mapUserDtotoModelCreate(createUserDto, saltedPassword)

            return await this.userService.createUser(userLogged, userToCreate);

        } catch (error) {
            return {message : error.message}; 
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/edit')
    async editUser(@Param('id') id: number, @Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  editUserDto: UserDto, @Req()req: Request): Promise<User | {}> {    

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const userToEdit = await this.userService.getUserById(id);
            const saltedPassword = await bcrypt.hash(editUserDto.password, parseInt(process.env.SALT_ROUNDS))
            const userToSave = mapUserDtoTomodelEdit(userToEdit, editUserDto, saltedPassword)

            return await this.userService.editUser(userLogged, userToSave);

        } catch (error) {
            return {message : error.message}; 
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/deleteuser')
    async deleteUser(@Param('id')id: number, @Req()req: Request ): Promise<{}> {

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const userId = +id; // Convertir id en nombre
            const user = await this.userService.getUserById(id);

            if (!user) {
                return {message: `User ${userId} do not exist`};
            };

            await this.userService.deleteUser(userLogged, id);
            return {message: `User ${userId} deleted`};

        } catch (error) {
            return {message : error.message}; 
        };        
    };

};
