import { Injectable } from "@nestjs/common";
import { PublicationRepository } from "../../domain/repositories/publication/publication.repository";
import { Publication } from "../../domain/models/publication/publication.model";

@Injectable()
export class PublicationService {


    constructor(private publicationRepository: PublicationRepository){};


    getAllPublication(): Publication[] {
        return this.publicationRepository.getAllPublication();
    };

    getPublicationById(publicationId: number): Publication | undefined {
        return this.publicationRepository.getPublicationById(publicationId);
    };

    createPublication(publication: Publication): Publication {
        this.publicationRepository.createPublication(publication);
        return publication;
    };

    editPublication(publication: Publication): Publication {
        this.publicationRepository.editPublication(publication);
        return publication;
    }

    deletePublication(publicationId: number): void {
        this.publicationRepository.deletePublication(publicationId);
    };


};