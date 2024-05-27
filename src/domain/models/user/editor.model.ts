import { Author } from '../user/author.model'
import { Role } from './role.model'; 

export class Editor extends Author {

    constructor(name: string, firstName: string, email: string, password: string, role: Role) {
        super(name, firstName, email, password, new Role (2, "editor"));
    };


};
