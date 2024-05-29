import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';
import { AdministratorService } from './administrator.service';


@Injectable()
export class UserService {

    constructor (
        private userRepository: UserRepository,
        private administratorService: AdministratorService
    ){};


    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    };

    getUserById(userId: number): User| undefined {
        return this.userRepository.getUserById(userId);
    };

    createUser(requestingUserId: number, user: User): User | Error {
        if (this.administratorService.isAdmin(requestingUserId)) {
            this.userRepository.createUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    editUser(requestingUserId: number, user: User): User | Error {
        if (this.administratorService.isAdmin(requestingUserId)) {
            this.userRepository.editUser(user);
            return user
        };
        throw new Error('Unauthorized');
    };

    deleteUser(requestingUserId: number, userId: number): void | Error {
        if (this.administratorService.isAdmin(requestingUserId)) {
            this.userRepository.deleteUser(userId);
        } else {
            throw new Error('Unauthorized');
        };
    };

};
