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


    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    };

    async getUserById(userId: number): Promise<User | undefined> {
        return this.userRepository.getUserById(userId);
    };

    async getUserByEmail(userEmail: string): Promise<User | undefined> {       
        return this.userRepository.getUserByEmail(userEmail);
    };

    async createUser(requestingUser: User, user: User): Promise<User> {
        if (this.roleService.isAdmin(requestingUser)) {
            await this.userRepository.createUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    async editUser(requestingUser: User, user: User): Promise<User> {
        if (this.roleService.isAdmin(requestingUser)) {
            await this.userRepository.editUser(user);
            return user
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
