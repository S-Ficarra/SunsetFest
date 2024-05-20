import { Publication } from "../../models/publication/Publication.model"; 

export interface PublicationRepository {

    getAllPublication(): Publication[];
    getPublicationById(id: number): Publication | undefined;
    createPublication(Publication: Publication): void;
    editPublication(Publication: Publication): void;
    deletePublication(id: number): void;

};
