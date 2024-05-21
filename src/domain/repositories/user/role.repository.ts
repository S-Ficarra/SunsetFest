import { Role } from "../../models/user/role.model"

export interface RoleRepository {

    getRoleById(id: number): Role | undefined;
    getAllRoles(): Role[];

}