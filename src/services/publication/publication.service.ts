import { Injectable } from "@nestjs/common";
import { PublicationRepository } from "../../domain/repositories/publication/publication.repository";
import { Publication } from "../../domain/models/publication/publication.model";
import { RoleService } from "../user/role.service";
import { User } from "../../domain/models/user/user.model";

@Injectable()
export class PublicationService {


    constructor(
        private publicationRepository: PublicationRepository,
        private roleService: RoleService,
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

    deletePublication(requestingUser: User, publicationId: number): void | Error { 
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.publicationRepository.deletePublication(publicationId);
        } else {
            throw new Error ('Unauthorized')
        };
    };

    changeStatus(requestingUser: User, publicationId: number, newStatus: boolean): void | Error {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.getPublicationById(publicationId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };
};