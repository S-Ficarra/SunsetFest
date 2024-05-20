import { Editor } from './editor.model'; 
import { Role } from './role.model'; 

export class Administrator extends Editor {

    constructor(id: number, name: string, firstName: string, email: string, password: string, role: Role) {
        super(id, name, firstName, email, password, role);
    };


};
