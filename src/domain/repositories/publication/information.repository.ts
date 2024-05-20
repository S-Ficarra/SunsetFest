import { Information } from "../../models/publication/information.model"; 
import { PublicationRepository } from "./publication.repository";

export interface InformationRepository extends PublicationRepository{

    getAllInformation(): Information[];
    getInformationById(id: number): Information | undefined;
    createInformation(Information: Information): void;
    editInformation(Information: Information): void;
    deleteInformation(id: number): void;

};