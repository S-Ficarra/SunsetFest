import { Author } from '../user/author.model'
import { UserTypes } from './UserType';

export class Editor extends Author {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserTypes.Editor);
    };


};
