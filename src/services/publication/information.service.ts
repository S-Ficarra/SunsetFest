import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { ContentService } from "./content.service";

export class InformationService {

    constructor(
        private informationRepository: InformationRepository,
        private contentService: ContentService,
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

    deleteInformation(informationId: number): void {
        let Information = this.informationRepository.getInformationById(informationId);
        let InformationContentId = Information.getContent();
        this.contentService.deleteContent(InformationContentId.getId());
        this.informationRepository.deleteInformation(informationId);
    };

};
