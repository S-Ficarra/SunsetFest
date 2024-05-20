import { User } from './user.model'
import { Role } from './role.model'; 

export class Author extends User {

    constructor(id: number, name: string, firstName: string, email: string, password: string, role: Role) {
        super(id, name, firstName, email, password, role);
    };


};
