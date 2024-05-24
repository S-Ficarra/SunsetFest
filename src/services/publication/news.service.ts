import { News } from "../../domain/models/publication/news.model";
import { NewsRepository } from "../../domain/repositories/publication/news.repository";
import { ContentService } from "./content.service";
//import { PublicationService } from "./publication.service";

export class NewsService{

    constructor(
        private newsRepository: NewsRepository,
        private contentService: ContentService,
        //private publicationService: PublicationService
    ){};

    getAllNews(): News[]{
        return this.newsRepository.getAllNews();
    };

    getNewsById(newsId: number): News | undefined{
        return this.newsRepository.getNewsById(newsId);
    };

    createNews(news: News): void {
        //this.publicationService.createPublication(news);
        this.contentService.createContent(news.content)
        this.newsRepository.createNews(news);        
    };

    editNews(news: News): void {
        //this.publicationService.editPublication(news)
        this.contentService.editContent(news.content)
        this.newsRepository.editNews(news);        
    };

    deleteNews(newsId: number): void {
        let news = this.newsRepository.getNewsById(newsId)
        let newsContentId = news.getContent()
        this.contentService.deleteContent(newsContentId.getId())
        this.newsRepository.deleteNews(newsId)
    }

};
