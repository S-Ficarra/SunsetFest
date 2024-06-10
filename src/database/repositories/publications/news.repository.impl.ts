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
import { mapNewsEntityToModel } from 'src/database/mappers/publications/news.mapper';
import { mapPubliDetailsToEntity, mapPubliDetailsToEntityEdit, mapPublicationModelToEntity } from 'src/database/mappers/publications/publication.mapper';
import { mapIllustratedImageToEntity, mapIllustratedPubliContentToEntity, mapIllustratedTypeToEntity } from 'src/database/mappers/publications/illustrated.mapper';


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
            const [content_entity, image_entity, detail_entity] = await Promise.all ([
                this.contentRepository.findOneBy({id: publi_entity.publication__contents_}),
                this.imageRepository.findOneBy({id: publi_entity.images_}),
                this.detailsRepository.findOneBy({id: publi_entity.publication__details_}),
            ]);
            const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
            return mapNewsEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
        })
        return Promise.all(mappedNews);
    };

    async getNewsById(newsId: number): Promise<News> {
        const publi_entity = await this.publicationRepository.findOneBy({id: newsId});
        const [content_entity, image_entity, detail_entity] = await Promise.all ([
            this.contentRepository.findOneBy({id: publi_entity.publication__contents_}),
            this.imageRepository.findOneBy({id: publi_entity.images_}),
            this.detailsRepository.findOneBy({id: publi_entity.publication__details_}),
        ]);
        const user_entity = await this.userRepository.findOneBy({id: detail_entity.author_});
        return mapNewsEntityToModel(publi_entity, content_entity, image_entity, detail_entity, user_entity);
    };

    async createNews(news: News): Promise<News> {
        const content_entity = mapIllustratedPubliContentToEntity(news);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntity(news);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntity(news);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapIllustratedTypeToEntity(news);
        await this.publiTypeRepository.save(type_entity);
        const createdNews = mapPublicationModelToEntity(content_entity.id, image_entity.id, type_entity.id, detail_entity.id);
        await this.publicationRepository.save(createdNews);
        news.setId(createdNews.id);
        return news;
    };

    async editNews(news: News): Promise<News> {
        const content_entity = mapIllustratedPubliContentToEntity(news);
        await this.contentRepository.save(content_entity);
        const image_entity = mapIllustratedImageToEntity(news);
        await this.imageRepository.save(image_entity);
        const detail_entity = mapPubliDetailsToEntityEdit(news);
        await this.detailsRepository.save(detail_entity);
        const type_entity = mapIllustratedTypeToEntity(news);
        await this.publiTypeRepository.save(type_entity);
        const editedNews = mapPublicationModelToEntity(content_entity.id, image_entity.id, type_entity.id, detail_entity.id);
        await this.publicationRepository.save(editedNews);
        news.setId(editedNews.id);
        return news;
    };

    async deleteNews(newsId: number): Promise<void> {
        this.publicationRepository.delete(newsId);
    };
   
};
