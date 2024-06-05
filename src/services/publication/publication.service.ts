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


    async getAllPublication(): Promise<Publication[]> {
        return this.publicationRepository.getAllPublication();
    };

    async getPublicationById(publicationId: number): Promise<Publication> {
        return this.publicationRepository.getPublicationById(publicationId);
    };

    async createPublication(publication: Publication): Promise<Publication> {
        this.publicationRepository.createPublication(publication);
        return publication;
    };

    async editPublication(publication: Publication): Promise<Publication> {
        this.publicationRepository.editPublication(publication);
        return publication;
    }

    async deletePublication(requestingUser: User, publicationId: number): Promise<void>{ 
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.publicationRepository.deletePublication(publicationId);
        } else {
            throw new Error ('Unauthorized')
        };
    };

    async changeStatus(requestingUser: User, publicationId: number, newStatus: boolean): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            (await this.getPublicationById(publicationId)).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };
};