import { Information } from "../../models/publication/information.model"; 

export interface InformationRepository{

    getAllInformation(): Information[];
    getInformationById(informationId: number): Information | undefined;
    createInformation(information: Information): void;
    editInformation(information: Information): void;
    deleteInformation(informationId: number): void;

};