import { Faq } from "../../models/publication/faq.model"; 
import { PublicationRepository } from "./publication.repository";

export interface FaqRepository {

    getAllFaq(): Faq[];
    getFaqById(faqId: number): Faq | undefined;
    createFaq(faq: Faq): void;
    editFaq(faq: Faq): void;
    deleteFaq(faqId: number): void;

};