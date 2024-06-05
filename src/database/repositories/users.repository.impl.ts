/* import { Repository, DeepPartial } from 'typeorm';
import { User } from 'src/domain/models/user/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../entities/users.entity';
import { UserRepository } from 'src/domain/repositories/user/user.repository';

export class UserRepositoryImpl implements UserRepository {
  
    constructor(
        @InjectRepository(users)
        private userRepository: Repository<users>,
    ) {}

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(user: User): Promise<void> {
        const userEntity: DeepPartial<users> = {
            id: user.getId(),
            name: user.getName(),
            firstName: user.getFirstName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        };
        await this.userRepository.save(userEntity);
    }

    async editUser(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
}  */