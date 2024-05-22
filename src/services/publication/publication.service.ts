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

    createPublication(publication: Publication): void {
        this.publicationRepository.createPublication(publication);
    };

    editPublication(publication: Publication): void {
        this.publicationRepository.editPublication(publication)
    }

    deletePublication(publicationId: number): void {
        this.publicationRepository.deletePublication(publicationId);
    };


};