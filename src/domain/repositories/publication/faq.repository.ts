import { Faq } from "../../models/publication/faq.model"; 
import { PublicationRepository } from "./publication.repository";

export interface FaqRepository extends PublicationRepository{

    getAllFaq(): Faq[];
    getFaqById(id: number): Faq | undefined;
    createFaq(Faq: Faq): void;
    editFaq(Faq: Faq): void;
    deleteFaq(id: number): void;

};