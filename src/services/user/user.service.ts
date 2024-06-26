import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';
import { RoleService } from './role.service';


@Injectable()
export class UserService {

    constructor (
        @Inject('UserRepository') private userRepository: UserRepository,
        private roleService: RoleService
    ){};


    async getAllUsers(): Promise<any> {
        return await this.userRepository.getAllUsers();
    };

    async getUserById(userId: number): Promise<any> {
        const user = await this.userRepository.getUserById(userId);
        if (user) {
            return user;
        };
        throw new Error (`User ${userId} Do not exist`);
    };

    async getUserByEmail(userEmail: string): Promise<User> {       
        return await this.userRepository.getUserByEmail(userEmail);
    };


    async createUser(requestingUser: User, user: User): Promise<User> {
        if (this.roleService.isAdmin(requestingUser)) {
            const existing_user = await this.userRepository.getUserByEmail(user.getEmail());                        
            if(existing_user){
                throw new Error ('Email already exist')
            };
            await this.userRepository.createUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    async editUser(requestingUser: User, user: User): Promise<User> {
        if (this.roleService.isAdmin(requestingUser)) {
            const isEmailTaken = await this.userRepository.getUserByEmail(user.getEmail());
            if(isEmailTaken && isEmailTaken.getId() !== user.getId()){
                throw new Error ('Email already exist')
            };
            const userEdited = await this.userRepository.editUser(user);
            return userEdited
        };
        throw new Error('Unauthorized');
    };

    async deleteUser(requestingUser: User, userId: number): Promise<void> {
        if (this.roleService.isAdmin(requestingUser)) {
            await this.userRepository.deleteUser(userId);
        } else {
            throw new Error('Unauthorized');
        };
    };

};
