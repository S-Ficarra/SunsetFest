import { UserTypes } from './UserType';
import { Editor } from './editor.model'; 

export class Administrator extends Editor {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserTypes.Administrator);
    };


};
