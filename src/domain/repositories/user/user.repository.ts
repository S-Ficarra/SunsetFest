import { User } from '../../models/user/user.model';

export interface UserRepository {

    getUserById(id: number): Promise <User | undefined>;
    getUserByEmail(email: string): Promise <User | undefined>;
    getAllUsers(): Promise <User[]>;
    createUser(user: User): Promise <User>;
    editUser(user: User): Promise <User>;
    deleteUser(userId: number): Promise <void>;

};
