import { users } from '../entities/users.entity';
import { User } from '../../domain/models/user/user.model'



export function mapUserEntityToModel(entity: users): User {
    const user = new User(
        entity.name,
        entity.first_name,
        entity.email,
        entity.password,
        entity.role
    );

    user.setId(entity.id)
    return user;
}

export function mapUserModelToEntity(model: User): users {
    const entity = new users();
    entity.name = model.getName();
    entity.first_name = model.getFirstName();
    entity.email = model.getEmail();
    entity.password = model.getPassword();
    entity.role = model.getRole();
    return entity;
}
