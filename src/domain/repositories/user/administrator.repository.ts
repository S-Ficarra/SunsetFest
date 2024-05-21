import { User } from '../../models/user/user.model';
import { EditorRepository } from './editor.repository';

export interface AdministratorRepository extends EditorRepository {

    changeRole(userId: number,newRoleId: number): void;

};
