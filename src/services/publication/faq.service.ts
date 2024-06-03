import { User } from "../../domain/models/user/user.model";
import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";
import { RoleService } from "../user/role.service";

export class FaqService {


    constructor(
        private faqRepository: FaqRepository,
        private roleService : RoleService,
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


    deleteFaq(requestingUser: User, faqId: number): void | Error {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.faqRepository.deleteFaq(faqId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    changeStatus(requestingUser: User, faqId: number, newStatus: boolean): void | Error {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.getFaqById(faqId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };


};