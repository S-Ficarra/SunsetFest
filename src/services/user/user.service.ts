import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { User } from '../../domain/models/user/user.model';


@Injectable()
export class UserService {

    constructor (private userRepository: UserRepository
    ) {};

    getUserById(id: number): User| undefined {
        return this.userRepository.getUserById(id);
    };

    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    };


};
