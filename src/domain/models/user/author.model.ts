import { User } from './user.model'
import { UserRole } from './UserRole';

export class Author extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserRole.Author);
    };


};
