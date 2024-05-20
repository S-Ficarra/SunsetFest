import { User } from '../../models/user/user.model';
import { EditorRepository } from './editor.repository';

export interface AdministratorRepository extends EditorRepository {

    createUser(user: User): void;
    editUser(user: User): void;
    deleteUser(user: User): void;

};
