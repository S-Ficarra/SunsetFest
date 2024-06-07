import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/models/user/user.model';
import { users } from '../entities/users.entity';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { mapUserEntityToModel, mapUserModelToEntity } from './mappers/user.mapper';

export class UserRepositoryImpl implements UserRepository {
  
    constructor(
        @InjectRepository(users)
        private userRepository: Repository<users>,
    ) {}

    async getUserById(id: number): Promise<User | undefined> {
        const userEntity = await this.userRepository.findOneBy({id: id});
        if (userEntity) {
            return mapUserEntityToModel(userEntity);
        }
        return undefined;
    }

    async getAllUsers(): Promise<User[]> {
        const allUsers = await this.userRepository.find();
        return allUsers.map(mapUserEntityToModel);
    }

    async createUser(user: User): Promise<User> {
        const userEntity = mapUserModelToEntity(user);
        await this.userRepository.save(userEntity);
        return user;
    }

    async editUser(user: User): Promise<User> {
        const userEntity = mapUserModelToEntity(user);
        await this.userRepository.save(userEntity);
        return user;
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
}
