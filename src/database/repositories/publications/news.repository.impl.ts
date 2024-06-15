import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/domain/models/publication/news.model';
import { publication_types } from "src/database/entities/publication_types.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { users } from 'src/database/entities/users.entity';
import { publications } from 'src/database/entities/publications.entity';
import { NewsRepository } from 'src/domain/repositories/publication/news.repository';
import { mapNewsEntityToModel, mapNewsTypeToEntity, mapNewsTypeToEntityEdit } from 'src/database/mappers/publications/news.mapper';
import { mapPubliDetailsToEntity, mapPubliDetailsToEntityEdit, mapPublicationModelToEntity, mapPublicationModelToEntityEdit } from 'src/database/mappers/publications/publication.mapper';
import { mapIllustratedImageToEntity, mapIllustratedImageToEntityEdit, mapIllustratedPubliContentToEntity, mapIllustratedPubliContentToEntityEdit,  } from 'src/database/mappers/publications/illustrated.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsRepositoryImpl implements NewsRepository {

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


    async getAllNews(): Promise<News[]> {
        const allNews = await this.publicationRepository.find();
        const mappedNews = allNews.map(async publi_entity => {
            const content_entity=  publi_entity.publication__contents_
            const image_entity = publi_entity.images_
            const detail_entity =  publi_entity.publication__details_
            const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
            return mapNewsEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
        })
        return Promise.all(mappedNews);
    };

    async getNewsById(newsId: number): Promise<News> {
        const publi_entity = await this.publicationRepository.findOneBy({id: newsId});
        if (publi_entity) {
            const content_entity=  publi_entity.publication__contents_
            const image_entity = publi_entity.images_
            const detail_entity =  publi_entity.publication__details_
            const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
            return mapNewsEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
        }
        throw new Error ('Publication do not exist');
    };

    async createNews(news: News): Promise<News> {
        const content_entity = mapIllustratedPubliContentToEntity(news);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntity(news);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntity(news);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapNewsTypeToEntity(news);        
        await this.publiTypeRepository.save(type_entity);
        const createdNews = mapPublicationModelToEntity(content_entity, image_entity, type_entity, detail_entity);
        await this.publicationRepository.save(createdNews);
        news.setId(createdNews.id);
        return news;
    };

    async editNews(news: News): Promise<News> {
        const news_entity = await this.publicationRepository.findOneBy({id: news.getId()})

        const content_entity = mapIllustratedPubliContentToEntityEdit(news, news_entity.publication__contents_.id);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntityEdit(news, news_entity.images_.id);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntityEdit(news, news_entity.publication__details_.id);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapNewsTypeToEntityEdit(news, news_entity.publication__types_.id);
        await this.publiTypeRepository.save(type_entity);
        const editedNews = mapPublicationModelToEntityEdit(news_entity.id, content_entity, image_entity, type_entity, detail_entity);
        await this.publicationRepository.save(editedNews);
        news.setId(editedNews.id);
        return news;
    };

    async deleteNews(newsId: number): Promise<void> {
        this.publicationRepository.delete(newsId);
    };
   
};
