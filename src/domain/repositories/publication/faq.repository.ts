import { Faq } from "../../models/publication/faq.model"; 

export interface FaqRepository {

    getAllFaq(): Promise <Faq[]>;
    getFaqById(faqId: number): Promise <Faq | undefined>;
    createFaq(faq: Faq): Promise <Faq>;
    editFaq(faq: Faq): Promise <Faq>;
    deleteFaq(faqId: number): Promise <void>;

};