import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user/user.model";


@Injectable()
export class RoleService {

    isEditor(user: User): boolean {
        let userRole = user.getRole();
        if (userRole == 2) {
            return true;
        };
        return false;
    };

    isAdmin(user: User): boolean {
        let userRole = user.getRole();
        if (userRole == 3) {
            return true;
        };
        return false;
    };

    changeRole(requestingUser: User, user: User, newRoleId: number): void | Error{
        if (this.isAdmin(requestingUser)) {
            user.setRole(newRoleId);
        } else {
            throw new Error('Unauthorized');
        };
    };
    
};