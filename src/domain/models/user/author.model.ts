import { UserRole } from './UserRole';
import { User } from './user.model'

export class Author extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: UserRole.Author) {
        super(name, firstName, email, password, role);
    };

};
