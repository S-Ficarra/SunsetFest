import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";

export class FaqService {


    constructor(
        private faqRepository: FaqRepository,
    ){};

    getAllFaq(): Faq[] {
        return this.faqRepository.getAllFaq();
    };


    getFaqById(faqId: number): Faq | undefined {   
        return this.faqRepository.getFaqById(faqId);
    };

    createFaq(faq: Faq): Faq {
        this.faqRepository.createFaq(faq);
        return faq;
    };

    editFaq(faq: Faq): Faq {
        this.faqRepository.editFaq(faq);
        return faq;
    };


    deleteFaq(faqId: number): void {
        this.faqRepository.deleteFaq(faqId);
    };


};