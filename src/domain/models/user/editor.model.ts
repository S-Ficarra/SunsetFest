import { UserRole } from './UserRole';
import { User } from './user.model';

export class Editor extends User {

    constructor(name: string, firstName: string, email: string, password: string, role: UserRole.Editor) {
        super(name, firstName, email, password, role);
    };

};
