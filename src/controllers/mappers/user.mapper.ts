import { User } from "src/domain/models/user/user.model";
import { UserDto } from "../DTO/user.dto";

export function mapUserDtotoModelCreate (userDto: UserDto, saltedPassword: string): User {

    const user = new User (
        userDto.name,
        userDto.firstName,
        userDto.email,
        saltedPassword,
        userDto.role
    );

    return user;
};


export function mapUserDtoTomodelEdit (userToEdit: User, userDto: UserDto, saltedPassword: string): User {

    userToEdit.setName(userDto.name);
    userToEdit.setFirstName(userDto.firstName)
    userToEdit.setEmail(userDto.email)
    userToEdit.setPassword(saltedPassword)
    userToEdit.setRole(userDto.role)

    return userToEdit;
};