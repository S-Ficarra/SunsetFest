import { Publication } from "../../models/publication/Publication.model"; 

export interface PublicationRepository {

    getAllPublication(): Publication[];
    getPublicationById(publicationId: number): Publication | undefined;
    createPublication(publication: Publication): void;
    editPublication(publication: Publication): void;
    deletePublication(publicationId: number): void;

};
