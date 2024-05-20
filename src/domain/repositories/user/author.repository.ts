import { Faq } from "../../models/publication/faq.model";
import { News } from "../../models/publication/news.model";
import { Information } from "../../models/publication/information.model";
import { Band } from "../../models/band/band.model";
import { UserRepository } from "./user.repository";

export interface AuthorRepository extends UserRepository{

    getFaqById(id: number): Faq | undefined;
    getAllFaq(): Faq[];
    createFaq(faq: Faq): void;
    editFaq(faq: Faq): void;

    getNewsById(id: number): News | undefined;
    getAllNews(): News[];
    createNews(news: News): void;
    editNews(news: News): void;
    
    getInformationById(id: number): Information | undefined;
    getAllInformation(): Information[];
    createInformation(information: Information): void;
    editInformation(information: Information): void;

    getBandById(id: number): Band | undefined;
    getAllBand(): Band[];
    createBand(band: Band): void;
    editBand(band: Band): void;

};
