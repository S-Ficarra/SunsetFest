import { User } from '../../models/user/user.model';

export interface UserRepository {

    getUserById(id: number): User | undefined;
    getAllUsers(): User[];

};
