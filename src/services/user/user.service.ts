import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';


@Injectable()
export class UserService {

    constructor (private userRepository: UserRepository
    ) {};


    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    };

    getUserById(userId: number): User| undefined {
        return this.userRepository.getUserById(userId);
    };

    createUser(user: User): User {
        this.userRepository.createUser(user);
        return user
    };

    editUser(user: User): User {
        this.userRepository.editUser(user);
        return user
    };

    deleteUser(userId: number): void {
        this.userRepository.deleteUser(userId);
    };


};
