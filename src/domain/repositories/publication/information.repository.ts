import { Information } from "../../models/publication/information.model"; 

export interface InformationRepository{

    getAllInformation(): Promise <Information[]>;
    getInformationById(informationId: number): Promise <Information | undefined>;
    createInformation(information: Information): Promise <Information>;
    editInformation(information: Information): Promise <Information>;
    deleteInformation(informationId: number): Promise <void>;

};