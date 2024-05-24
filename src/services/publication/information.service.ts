import { Information } from "../../domain/models/publication/information.model";
import { InformationRepository } from "../../domain/repositories/publication/information.repository";
import { ContentService } from "./content.service";
//import { PublicationService } from "./publication.service";

export class InformationService {

    constructor(
        private informationRepository: InformationRepository,
        private contentService: ContentService,
        //private publicationService: PublicationService
    ){};

    getAllInformation(): Information[]{
        return this.informationRepository.getAllInformation();
    };

    getInformationById(informationId: number): Information | undefined{
        return this.informationRepository.getInformationById(informationId);
    };

    createInformation(information: Information): void {
        //this.publicationService.createPublication(Information);
        this.contentService.createContent(information.content)
        this.informationRepository.createInformation(information);        
    };

    editInformation(information: Information): void {
        //this.publicationService.editPublication(Information)
        this.contentService.editContent(information.content)
        this.informationRepository.editInformation(information);        
    };

    deleteInformation(informationId: number): void {
        let Information = this.informationRepository.getInformationById(informationId)
        let InformationContentId = Information.getContent()
        this.contentService.deleteContent(InformationContentId.getId())
        this.informationRepository.deleteInformation(informationId)
    }

};
