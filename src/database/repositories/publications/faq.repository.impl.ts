import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from '../../../domain/models/publication/faq.model';
import { faqs } from '../../../database/entities/faqs.entity';
import { publication_details } from '../../../database/entities/publication_details.entity';
import { users } from '../../../database/entities/users.entity';
import { FaqRepository } from '../../../domain/repositories/publication/faq.repository';
import { mapFaqEntitytoModel, mapFaqModeltoEntity, mapFaqModeltoEntityEdit } from '../../mappers/publications/faq.mapper';
import { mapPubliDetailsToEntity, mapPubliDetailsToEntityEdit } from '../../mappers/publications/publication.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqRepositoryImpl implements FaqRepository {

    constructor(
        @InjectRepository(faqs)
        private faqsRepository: Repository<faqs>,
        @InjectRepository(publication_details)
        private publicationDetailsRepository: Repository<publication_details>,
        @InjectRepository(users)
        private userRepository: Repository<users>
    ){};


    async getAllFaq(): Promise<Faq[]> {
        const allFaqs = await this.faqsRepository.find();
        const mappedFaqsPromises = allFaqs.map(async faq_entity => {
            const user_entity = await this.userRepository.findOneBy({id: faq_entity.publication__details_.authorId_});
            return mapFaqEntitytoModel(faq_entity, faq_entity.publication__details_, user_entity);
        });
        return Promise.all(mappedFaqsPromises);
    };

    async getFaqById(faqId: number): Promise<Faq> {
        const faq_entity = await this.faqsRepository.findOneBy({id: faqId});
        if (faq_entity) {
            const user_entity = await this.userRepository.findOneBy({id: faq_entity.publication__details_.authorId_});
            return mapFaqEntitytoModel(faq_entity, faq_entity.publication__details_, user_entity);
        };
        return null;
    };

    async createFaq(faq: Faq): Promise<Faq> {
        const publication_details = mapPubliDetailsToEntity(faq);
        await this.publicationDetailsRepository.save(publication_details);
        const createdFaq = mapFaqModeltoEntity(faq, publication_details);
        await this.faqsRepository.save(createdFaq);
        faq.setId(createdFaq.id);
        return faq; 
    };

    async editFaq(faq: Faq): Promise<Faq> {
        const faq_entity = await this.faqsRepository.findOneBy({id: faq.getId()})
        const publication_details = mapPubliDetailsToEntityEdit(faq, faq_entity.publication__details_.id);
        await this.publicationDetailsRepository.save(publication_details);
        const editedFaq = mapFaqModeltoEntityEdit(faq_entity.id, faq, publication_details);
        await this.faqsRepository.save(editedFaq);
        faq.setId(editedFaq.id);
        return faq; 
    };

    async deleteFaq(faqId: number): Promise<void> {
        const faq_entity = await this.faqsRepository.findOneBy({id: faqId});
        const publi_detail = faq_entity.publication__details_.id;

        await this.publicationDetailsRepository.delete(publi_detail);
        await this.faqsRepository.delete(faqId);
    };
    
};