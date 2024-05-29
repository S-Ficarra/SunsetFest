import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";

export class FaqService {


    constructor(
        private faqRepository: FaqRepository,
        private administratorService : AdministratorService,
        private editorService: EditorService,
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


    deleteFaq(requestingUserId: number, faqId: number): void | Error {
        if (this.editorService.isEditor(requestingUserId) || this.administratorService.isAdmin(requestingUserId)){
            this.faqRepository.deleteFaq(faqId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    changeStatus(requestingUserId: number, faqId: number, newStatus: boolean): void | Error {
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            this.getFaqById(faqId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };


};