import { User } from './user.model'
import { Role } from './role.model'; 

export class Author extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: Role) {
        super(name, firstName, email, password, new Role (1, "author"));
    };


};
