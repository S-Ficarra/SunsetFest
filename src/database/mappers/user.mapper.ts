import { users } from '../entities/users.entity';
import { User } from '../../domain/models/user/user.model'
import { IsString, IsEmail, MinLength, Matches, IsIn } from 'class-validator';



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
};

export function mapUserModelToEntity(model: User): users {
    const entity = new users();
    entity.name = model.getName();
    entity.first_name = model.getFirstName();
    entity.email = model.getEmail();
    entity.password = model.getPassword();
    entity.role = model.getRole();
    return entity;
};


export function mapUserModelToEntityEdit(model: User): users {

    const entity = new users();
    entity.id = model.getId()
    entity.name = model.getName();
    entity.first_name = model.getFirstName();
    entity.email = model.getEmail();
    entity.role = model.getRole();
    return entity;
};


export class CreateUserDto {
    @IsString()
    name: string;
  
    @IsString()
    firstName: string;
  
    @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
    email: string;
  
    @IsString()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    @Matches(/(?=.*[a-z])/, { message: 'Le mot de passe doit contenir au moins une lettre minuscule.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Le mot de passe doit contenir au moins une lettre majuscule.' })
    @Matches(/(?=.*\d)/, { message: 'Le mot de passe doit contenir au moins un chiffre.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Le mot de passe doit contenir au moins un caractère spécial.' })
    password: string;
  
    @IsIn(["1", "2", "3"])
    role: number;
};