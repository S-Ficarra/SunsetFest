import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe, HttpStatus, Res } from '@nestjs/common';
import { UserDto } from '../DTO/user.dto';
import { User } from '../../domain/models/user/user.model';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../../authentification/jwt-auth.guard';
import { AuthentificationService } from '../../authentification/authentification.service';
import { mapUserDtoTomodelEdit, mapUserDtotoModelCreate } from '../mappers/user.mapper';
import { Response } from 'express';
require('dotenv').config();



@Controller()
export class UserController {


    constructor(
        private readonly userService: UserService,
        private readonly authService : AuthentificationService
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getAllUsers(@Res() res: Response): Promise<User | {}> {
        try {
            const users =  await this.userService.getAllUsers();
            return res.status(HttpStatus.OK).send(users);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('users/:id')
    async getUserById(@Param('id') id: number, @Res() res: Response): Promise<User | {}> {   
        try {
            const user = await this.userService.getUserById(id);
            return res.status(HttpStatus.OK).send(user);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };

    
    @UseGuards(JwtAuthGuard)
    @Post('users/create')
    async createUser(
        @Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  createUserDto: UserDto, 
        @Req()req: Request, 
        @Res() res: Response): Promise<User | {}> {    

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const saltedPassword = await bcrypt.hash(createUserDto.password, parseInt(process.env.SALT_ROUNDS))
            const userToCreate = mapUserDtotoModelCreate(createUserDto, saltedPassword)
            const createdUser = await this.userService.createUser(userLogged, userToCreate)

            return res.status(HttpStatus.OK).json(createdUser);

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/edit')
    async editUser(@Param('id') id: number, @Body(new ValidationPipe())/*<-validate RegExs for password etc, defined here ->*/  editUserDto: UserDto, @Req()req: Request, @Res() res: Response): Promise<User | {}> {    

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const userToEdit = await this.userService.getUserById(id);           
            const saltedPassword = await bcrypt.hash(editUserDto.password, parseInt(process.env.SALT_ROUNDS))
            const userToSave = mapUserDtoTomodelEdit(userToEdit, editUserDto, saltedPassword)           

            const userEdited = await this.userService.editUser(userLogged, userToSave);
            return res.status(HttpStatus.OK).send(userEdited);

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('users/:id/delete')
    async deleteUser(@Param('id')id: number, @Req()req: Request, @Res() res: Response ): Promise<{}> {

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const userId = +id; // the + id used to transform id from string to number
            const user = await this.userService.getUserById(id);

            if (user) {
                await this.userService.deleteUser(userLogged, id);
                return res.status(HttpStatus.OK).json({message: `User ${userId} deleted`});
            };
            return res.status(HttpStatus.BAD_REQUEST).json({message: `User ${userId} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };        
    };

    
};
