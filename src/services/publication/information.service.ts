import { User } from "../../domain/models/user/user.model";
import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { RoleService } from "../user/role.service";

export class InformationService {

    constructor(
        private informationRepository: InformationRepository,
        private roleService : RoleService,
    ){};

    async getAllInformation(): Promise<Information[]>{
        return this.informationRepository.getAllInformation();
    };

    async getInformationById(informationId: number): Promise<Information>{
        return this.informationRepository.getInformationById(informationId);
    };

    async createInformation(information: Information): Promise<Information> {
        this.informationRepository.createInformation(information);  
        return information;      
    };

    async editInformation(information: Information): Promise<Information> {
        this.informationRepository.editInformation(information);    
        return information;
    };


    async deleteInformation(requestingUser: User, informationId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.informationRepository.deleteInformation(informationId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    async changeStatus(requestingUser: User, informationId: number, newStatus: boolean): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            (await this.getInformationById(informationId)).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
