import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';


@Injectable()
export class UserService {

    constructor (private userRepository: UserRepository
    ) {};

    getUserById(userId: number): User| undefined {
        return this.userRepository.getUserById(userId);
    };

    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    };

    createUser(user: User): void {
        this.userRepository.createUser(user);
    };

    editUser(user: User): void {
        this.userRepository.editUser(user);
    };

    deleteUser(userId: number): void {
        this.userRepository.deleteUser(userId);
    };


};
