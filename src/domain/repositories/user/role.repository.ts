import { User } from '../../models/user/user.model';

export interface UserRepository {

    changeRole(requestingUser: User, user: User, newRoleId: number): Promise <void | Error>;

};
