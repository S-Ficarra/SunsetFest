import { User } from "../../domain/models/user/user.model";
import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";
import { RoleService } from "../user/role.service";

export class FaqService {


    constructor(
        private faqRepository: FaqRepository,
        private roleService : RoleService,
    ){};

    async getAllFaq(): Promise<Faq[]> {
        return this.faqRepository.getAllFaq();
    };


    async getFaqById(faqId: number): Promise<Faq> {   
        return this.faqRepository.getFaqById(faqId);
    };

    async createFaq(faq: Faq): Promise<Faq> {
        this.faqRepository.createFaq(faq);
        return faq;
    };

    async editFaq(faq: Faq): Promise<Faq> {
        this.faqRepository.editFaq(faq);
        return faq;
    };


    async deleteFaq(requestingUser: User, faqId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.faqRepository.deleteFaq(faqId);
        } else {
            throw new Error('Unauthorized');
        };
    };

    async changeStatus(requestingUser: User, faqId: number, newStatus: boolean): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            (await this.getFaqById(faqId)).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };


};