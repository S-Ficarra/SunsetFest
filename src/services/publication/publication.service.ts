import { Injectable } from "@nestjs/common";
import { PublicationRepository } from "../../domain/repositories/publication/publication.repository";
import { Publication } from "../../domain/models/publication/publication.model";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";

@Injectable()
export class PublicationService {


    constructor(
        private publicationRepository: PublicationRepository,
        private administratorService: AdministratorService,
        private editorService: EditorService,
        ){};


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

    deletePublication(requestingUserId: number, publicationId: number): void | Error { 
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            this.publicationRepository.deletePublication(publicationId);
        } else {
            throw new Error ('Unauthorized')
        };
    };

    changeStatus(requestingUserId: number, publicationId: number, newStatus: boolean): void | Error {
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            this.getPublicationById(publicationId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };
};