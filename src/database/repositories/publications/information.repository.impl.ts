import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from 'src/domain/models/publication/information.model';
import { publication_types } from "src/database/entities/publication_types.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { users } from 'src/database/entities/users.entity';
import { publications } from 'src/database/entities/publications.entity';
import { InformationRepository } from 'src/domain/repositories/publication/information.repository';
import { mapInformationEntityToModel, mapInformationTypeToEntity, mapInformationTypeToEntityEdit } from 'src/database/mappers/publications/information.mapper';
import { mapPubliDetailsToEntity, mapPubliDetailsToEntityEdit, mapPublicationModelToEntity, mapPublicationModelToEntityEdit } from 'src/database/mappers/publications/publication.mapper';
import { mapIllustratedImageToEntity, mapIllustratedImageToEntityEdit, mapIllustratedPubliContentToEntity, mapIllustratedPubliContentToEntityEdit } from 'src/database/mappers/publications/illustrated.mapper';


export class InformationRepositoryImpl implements InformationRepository {

    constructor(
        @InjectRepository(publication_types)
        private publiTypeRepository: Repository<publication_types>,
        @InjectRepository(publications)
        private publicationRepository: Repository<publications>,
        @InjectRepository(publication_contents)
        private contentRepository: Repository<publication_contents>,
        @InjectRepository(images)
        private imageRepository: Repository<images>,
        @InjectRepository(publication_details)
        private detailsRepository: Repository<publication_details>,
        @InjectRepository(users)
        private userRepository: Repository<users>
    ){};


    async getAllInformation(): Promise<Information[]> {
        const allInformations = await this.publicationRepository.find();
        const mappedInformations = allInformations.map(async publi_entity => {
            const content_entity=  publi_entity.publication__contents_
            const image_entity = publi_entity.images_
            const detail_entity =  publi_entity.publication__details_
            const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
            return mapInformationEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
        })
        return Promise.all(mappedInformations);
    };

    async getInformationById(informationId: number): Promise<Information> {
        const publi_entity = await this.publicationRepository.findOneBy({id: informationId});
        const content_entity=  publi_entity.publication__contents_
        const image_entity = publi_entity.images_
        const detail_entity =  publi_entity.publication__details_
        const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
        return mapInformationEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
    };

    async createInformation(information: Information): Promise<Information> {
        const content_entity = mapIllustratedPubliContentToEntity(information);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntity(information);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntity(information);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapInformationTypeToEntity(information);
        await this.publiTypeRepository.save(type_entity);
        const createdInformation = mapPublicationModelToEntity(content_entity, image_entity, type_entity, detail_entity);
        await this.publicationRepository.save(createdInformation);
        information.setId(createdInformation.id);
        return information;
    };

    async editInformation(information: Information): Promise<Information> {
        const information_entity = await this.publicationRepository.findOneBy({id: information.getId()})

        const content_entity = mapIllustratedPubliContentToEntityEdit(information, information_entity.publication__contents_.id);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntityEdit(information, information_entity.images_.id);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntityEdit(information, information_entity.publication__details_.id);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapInformationTypeToEntityEdit(information, information_entity.publication__types_.id);
        await this.publiTypeRepository.save(type_entity);
        const editedInformation = mapPublicationModelToEntityEdit(information_entity.id, content_entity, image_entity, type_entity, detail_entity);
        await this.publicationRepository.save(editedInformation);
        information.setId(editedInformation.id);
        return information;
    };

    async deleteInformation(informationId: number): Promise<void> {
        this.publicationRepository.delete(informationId);
    };
   
};
