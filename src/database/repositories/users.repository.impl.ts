import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/models/user/user.model';
import { users } from '../entities/users.entity';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { mapUserEntityToModel, mapUserModelToEntity } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  
    constructor(
        @InjectRepository(users)
        private userRepository: Repository<users>,
    ){};

    async getUserById(id: number): Promise<User | undefined> {
        const userEntity = await this.userRepository.findOneBy({id: id});
        return mapUserEntityToModel(userEntity);
    };

    async getUserByEmail(userEmail: string): Promise<User | undefined> {    
        const user_entity = await this.userRepository.findOne({where: { email: userEmail } });
        if(user_entity){
        return mapUserEntityToModel(user_entity);
        }
        throw new Error ('User do not exist')
    };

    async getAllUsers(): Promise<User[]> {
        const allUsers = await this.userRepository.find();
        const allMappedUser = allUsers.map(async user_entity => {
            return mapUserEntityToModel(user_entity);
        })
        return Promise.all(allMappedUser);
    };

    async createUser(user: User): Promise<User> {
        const user_entity = mapUserModelToEntity(user);
        const existing_user = await this.userRepository.findOneBy({email: user_entity.email});
        if(existing_user){
            throw new Error ('Email already exist')
        }
        const createdUser = await this.userRepository.save(user_entity);
        user.setId(createdUser.id)
        return user;
    };

    async editUser(user: User): Promise<User> {
        const user_entity = mapUserModelToEntity(user);
        const editedUser = await this.userRepository.save(user_entity);
        user.setId(editedUser.id)
        return user;
    };

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
};
