import { User } from "../src/domain/models/user/user.model";
import { UserRepository } from "../src/domain/repositories/user/user.repository";
import { Role } from "../src/domain/models/user/role.model";

export class MockUserRepository implements UserRepository {

    private users: User[] = [
        new User(1, 'John', 'Doe', 'john@example.com', 'password', new Role(1, 'Author')),
        new User(2, 'Julien', 'Deaux', 'julien@example.com', 'password', new Role(2, 'Editor')),
        new User(3, 'Jane', 'Doe', 'jane@example.com', 'password', new Role(3, 'Admin'))
    ];

    getUserById(id: number): User | undefined {
        return this.users.find(user => user.getId() === id);
    }

    getAllUsers(): User[] {
        return this.users;
    }


};
