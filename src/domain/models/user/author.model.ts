import { User } from './user.model'
import { UserTypes } from './UserType';

export class Author extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: number) {
        super(name, firstName, email, password, UserTypes.Author);
    };


};
