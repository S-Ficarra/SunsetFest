import { Faq } from "../../models/publication/faq.model"; 

export interface FaqRepository {

    getAllFaq(): Faq[];
    getFaqById(faqId: number): Faq | undefined;
    createFaq(faq: Faq): void;
    editFaq(faq: Faq): void;
    deleteFaq(faqId: number): void;

};