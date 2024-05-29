import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user/user.model";
import { UserRepository } from "src/domain/repositories/user/user.repository";

@Injectable()
export class EditorService {

    constructor(private userRepository : UserRepository){};

    isEditor(userId: number): boolean {
        let user: User | undefined = this.userRepository.getUserById(userId)
        if (user && user.getRole() == 2) {
            return true;
        };
        return false;
    };
};