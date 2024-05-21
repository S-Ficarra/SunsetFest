import { User } from '../../models/user/user.model';

export interface UserRepository {

    getUserById(id: number): User | undefined;
    getAllUsers(): User[];
    createUser(user: User): void;
    editUser(user: User): void;
    deleteUser(userId: number): void;

};
