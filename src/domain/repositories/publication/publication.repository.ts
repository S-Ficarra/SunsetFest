import { Publication } from "../../models/publication/Publication.model"; 

export interface PublicationRepository {

    getAllPublication(): Promise <Publication[]>;
    getPublicationById(publicationId: number): Promise <Publication | undefined>;
    createPublication(publication: Publication): Promise <Publication>;
    editPublication(publication: Publication): Promise <Publication>;
    deletePublication(publicationId: number): Promise <void>;

};
