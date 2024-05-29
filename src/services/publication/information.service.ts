import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";
import { ContentService } from "./content.service";

export class InformationService {

    constructor(
        private informationRepository: InformationRepository,
        private contentService: ContentService,
        private administratorService : AdministratorService,
        private editorService: EditorService,
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

    deleteInformation(requestingUserId: number, informationId: number): void | Error {
        if (this.editorService.isEditor(requestingUserId) || this.administratorService.isAdmin(requestingUserId)){
            let Information = this.informationRepository.getInformationById(informationId);
            let InformationContentId = Information.getContent();
            this.contentService.deleteContent(InformationContentId.getId());
            this.informationRepository.deleteInformation(informationId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    changeStatus(requestingUserId: number, informationId: number, newStatus: boolean): void | Error {
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            this.getInformationById(informationId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
