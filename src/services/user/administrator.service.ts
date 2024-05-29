import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user/user.model";
import { UserRepository } from "src/domain/repositories/user/user.repository";

@Injectable()
export class AdministratorService {

    constructor(private userRepository : UserRepository){};

    isAdmin(userId: number): boolean {
        let user: User | undefined = this.userRepository.getUserById(userId);        
        if (user && user.getRole() == 3) {
            return true;
        };
        return false;
    };

    changeRole(requestingUserId: number, userId: number, newRoleId: number): void | Error{
        if (this.isAdmin(requestingUserId)) {
        this.userRepository.getUserById(userId).setRole(newRoleId);
        } else {
            throw new Error('Unauthorized');
        };
    };
};