import { Editor } from './editor.model'; 
import { Role } from './role.model'; 

export class Administrator extends Editor {

    constructor(name: string, firstName: string, email: string, password: string, role: Role) {
        super(name, firstName, email, password, new Role (3, "administrator"));
    };


};
