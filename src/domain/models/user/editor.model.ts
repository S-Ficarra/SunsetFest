import { Author } from '../user/author.model'
import { UserRole } from './UserRole';

export class Editor extends Author {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserRole.Editor);
    };


};
