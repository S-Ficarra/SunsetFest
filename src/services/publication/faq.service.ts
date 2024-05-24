import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";
//import { PublicationService } from "./publication.service";

export class FaqService {


    constructor(
        private faqRepository: FaqRepository,
        //private publicationService: PublicationService
    ){};

    getAllFaq(): Faq[] {
        return this.faqRepository.getAllFaq();
    };


    getFaqById(faqId: number): Faq | undefined {   
        return this.faqRepository.getFaqById(faqId);
    };

    createFaq(faq: Faq): void {
        //this.publicationService.createPublication(faq);
        this.faqRepository.createFaq(faq);
    };

    editFaq(faq: Faq): void {
        //this.publicationService.editPublication(faq)
        this.faqRepository.editFaq(faq);
    };


    deleteFaq(faqId: number): void {
        this.faqRepository.deleteFaq(faqId);
    };


};