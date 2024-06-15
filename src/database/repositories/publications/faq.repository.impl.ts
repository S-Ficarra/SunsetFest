import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from 'src/domain/models/publication/faq.model';
import { faqs } from 'src/database/entities/faqs.entity';
import { publication_details } from 'src/database/entities/publication_details.entity';
import { users } from 'src/database/entities/users.entity';
import { FaqRepository } from 'src/domain/repositories/publication/faq.repository';
import { mapFaqEntitytoModel, mapFaqModeltoEntity } from '../../mappers/publications/faq.mapper';
import { mapPubliDetailsToEntity, mapPubliDetailsToEntityEdit } from '../../mappers/publications/publication.mapper';


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
            const publication_details = await this.publicationDetailsRepository.findOneBy({id: faq_entity.publication__details_});
            const user_entity = await this.userRepository.findOneBy({id: publication_details.author_});
            return mapFaqEntitytoModel(faq_entity, publication_details, user_entity);
        });
        return Promise.all(mappedFaqsPromises);
    };

    async getFaqById(faqId: number): Promise<Faq> {
        const faq_entity = await this.faqsRepository.findOneBy({id: faqId});
        const publication_details = await this.publicationDetailsRepository.findOneBy({id: faq_entity.publication__details_});
        const user_entity = await this.userRepository.findOneBy({id: publication_details.author_});
        return mapFaqEntitytoModel(faq_entity, publication_details, user_entity);
    };

    async createFaq(faq: Faq): Promise<Faq> {
        const publication_details = mapPubliDetailsToEntity(faq);
        await this.publicationDetailsRepository.save(publication_details);
        const createdFaq = mapFaqModeltoEntity(faq, publication_details.id);
        faq.setId(createdFaq.id);
        return faq; 
    };

    async editFaq(faq: Faq): Promise<Faq> {
        const publication_details = mapPubliDetailsToEntityEdit(faq);
        await this.publicationDetailsRepository.save(publication_details);
        const editedFaq = mapFaqModeltoEntity(faq, publication_details.id);
        faq.setId(editedFaq.id);
        return faq; 
    };

    async deleteFaq(faqId: number): Promise<void> {
        this.faqsRepository.delete(faqId);
    };
    
};