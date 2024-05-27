import { News } from "../../domain/models/publication/news.model";
import { NewsRepository } from "../../domain/repositories/publication/news.repository";
import { ContentService } from "./content.service";

export class NewsService{

    constructor(
        private newsRepository: NewsRepository,
        private contentService: ContentService,
    ){};

    getAllNews(): News[]{
        return this.newsRepository.getAllNews();
    };

    getNewsById(newsId: number): News | undefined{
        return this.newsRepository.getNewsById(newsId);
    };

    createNews(news: News): News {
        this.contentService.createContent(news.getContent());
        this.newsRepository.createNews(news);   
        return news;     
    };

    editNews(news: News): News {
        this.contentService.editContent(news.getContent());
        this.newsRepository.editNews(news);    
        return news;         
    };

    deleteNews(newsId: number): void {
        let news = this.newsRepository.getNewsById(newsId);
        let newsContentId = news.getContent();
        this.contentService.deleteContent(newsContentId.getId());
        this.newsRepository.deleteNews(newsId);
    };

};
