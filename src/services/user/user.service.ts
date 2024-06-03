import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';
import { RoleService } from './role.service';


@Injectable()
export class UserService {

    constructor (
        private userRepository: UserRepository,
        private administratorService: RoleService
    ){};


    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    };

    getUserById(userId: number): User| undefined {
        return this.userRepository.getUserById(userId);
    };

    createUser(requestingUser: User, user: User): User | Error {
        if (this.administratorService.isAdmin(requestingUser)) {
            this.userRepository.createUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    editUser(requestingUser: User, user: User): User | Error {
        if (this.administratorService.isAdmin(requestingUser)) {
            this.userRepository.editUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    deleteUser(requestingUser: User, userId: number): void | Error {
        if (this.administratorService.isAdmin(requestingUser)) {
            this.userRepository.deleteUser(userId);
        } else {
            throw new Error('Unauthorized');
        };
    };

};
