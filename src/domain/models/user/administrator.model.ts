import { UserRole } from './UserRole';
import { User } from './user.model';

export class Administrator extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: UserRole.Administrator) {
        super(name, firstName, email, password, role);
    };


};
