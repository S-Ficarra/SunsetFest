import { Author } from '../user/author.model'
import { Role } from './role.model'; 

export class Editor extends Author {

    constructor(id: number, name: string, firstName: string, email: string, password: string, role: Role) {
        super(id, name, firstName, email, password, role);
    };


};
