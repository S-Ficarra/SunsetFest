import { User } from "../../domain/models/user/user.model";
import { Faq } from "../../domain/models/publication/faq.model";
import { FaqRepository } from "../../domain/repositories/publication/faq.repository";
import { RoleService } from "../user/role.service";
import { Inject } from "@nestjs/common";

export class FaqService {


    constructor(
        @Inject('FaqRepository') private faqRepository: FaqRepository,
        private roleService : RoleService,
    ){};

    async getAllFaq(): Promise<Faq[]> {
        return await this.faqRepository.getAllFaq();
    };


    async getFaqById(faqId: number): Promise<Faq> {   
        const faq = await this.faqRepository.getFaqById(faqId);
        if (faq) {
            return faq;
        };
        throw new Error (`Faq ${faqId} do not exist`);
    };

    async createFaq(faq: Faq): Promise<Faq> {
        const faqCreated = await this.faqRepository.createFaq(faq);
        return faqCreated;
    };

    async editFaq(faq: Faq): Promise<Faq> {
        const faqEdited = await this.faqRepository.editFaq(faq);
        return faqEdited;
    };


    async deleteFaq(requestingUser: User, faqId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            await this.faqRepository.deleteFaq(faqId);
        } else {
            throw new Error('Unauthorized');
        };
    };



};