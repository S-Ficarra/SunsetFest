import { User } from "../../domain/models/user/user.model";
import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { RoleService } from "../user/role.service";
import { ContentService } from "./content.service";

export class InformationService {

    constructor(
        private informationRepository: InformationRepository,
        private contentService: ContentService,
        private roleService : RoleService,
    ){};

    getAllInformation(): Information[]{
        return this.informationRepository.getAllInformation();
    };

    getInformationById(informationId: number): Information | undefined{
        return this.informationRepository.getInformationById(informationId);
    };

    createInformation(information: Information): Information {
        this.contentService.createContent(information.getContent());
        this.informationRepository.createInformation(information);  
        return information;      
    };

    editInformation(information: Information): Information {
        this.contentService.editContent(information.getContent());
        this.informationRepository.editInformation(information);    
        return information;
    };


    deleteInformation(requestingUser: User, informationId: number): void | Error {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let Information = this.informationRepository.getInformationById(informationId);
            let InformationContentId = Information.getContent();
            this.contentService.deleteContent(InformationContentId.getId());
            this.informationRepository.deleteInformation(informationId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    changeStatus(requestingUser: User, informationId: number, newStatus: boolean): void | Error {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.getInformationById(informationId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
