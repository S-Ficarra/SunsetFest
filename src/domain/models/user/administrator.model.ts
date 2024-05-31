import { UserRole } from './UserRole';
import { Editor } from './editor.model'; 

export class Administrator extends Editor {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserRole.Administrator);
    };


};
