import { User } from "../../domain/models/user/user.model";
import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { RoleService } from "../user/role.service";
import { Inject } from "@nestjs/common";

export class InformationService {

    constructor(
        @Inject('InformationRepository') private informationRepository: InformationRepository,
        private roleService : RoleService,
    ){};

    async getAllInformation(): Promise<Information[]> {
        const allInfo = await this.informationRepository.getAllInformation();
        const allNull = allInfo.every(info => info === null);
        if (allNull) {           
            throw new Error ('No informations found');
        }
        return allInfo;
    };

    async getInformationById(informationId: number): Promise<Information>{
        const info = await this.informationRepository.getInformationById(informationId);
        if (info) {
            return info;
        };
        throw new Error (`Information ${informationId} do not exist`);
    };

    async createInformation(information: Information): Promise<Information> {
        const infoCreated = await this.informationRepository.createInformation(information);  
        return infoCreated;      
    };

    async editInformation(information: Information): Promise<Information> {
        const infoEdited = await this.informationRepository.editInformation(information);    
        return infoEdited;
    };


    async deleteInformation(requestingUser: User, informationId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            await this.informationRepository.deleteInformation(informationId);
        } else {
            throw new Error('Unauthorized');
        };
    };


};
