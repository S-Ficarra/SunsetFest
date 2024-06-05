import { User } from "../../src/domain/models/user/user.model";
import { UserRepository } from "../../src/domain/repositories/user/user.repository";

export class MockUserRepository implements UserRepository {

    public users: User[] = [
        new User('John', 'Doe', 'john@example.com', 'password', 1),
        new User('Julien', 'Deaux', 'julien@example.com', 'password', 2),
        new User('Jane', 'Doe', 'jane@example.com', 'password', 3)
    ];

    setFakeIdToTest(): void {
        this.users[0].setId(1)
        this.users[1].setId(2)
        this.users[2].setId(3)

    };

    async getUserById(id: number): Promise<User | undefined> {
        return this.users.find(user => user.getId() === id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

    async createUser(user: User): Promise<User> {
        user.setId(this.users.length + 1)        
        this.users.push(user);
        return user
    };

    async editUser(user: User): Promise<User> {
        let userId = user.getId();
        this.users[userId - 1] = user;
        return user
    };

    async deleteUser(userId: number): Promise<void> {
        this.users = this.users.filter(user => user.getId() !== userId);
    };


};
