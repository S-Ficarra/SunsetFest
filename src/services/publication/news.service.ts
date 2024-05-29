import { News } from "../../domain/models/publication/news.model";
import { NewsRepository } from "../../domain/repositories/publication/news.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";
import { ContentService } from "./content.service";

export class NewsService{

    constructor(
        private newsRepository: NewsRepository,
        private contentService: ContentService,
        private administratorService : AdministratorService,
        private editorService: EditorService,
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

    deleteNews(requestingUserId: number, newsId: number): void | Error {
        if (this.editorService.isEditor(requestingUserId) || this.administratorService.isAdmin(requestingUserId)){
            let news = this.newsRepository.getNewsById(newsId);
            let newsContentId = news.getContent();
            this.contentService.deleteContent(newsContentId.getId());
            this.newsRepository.deleteNews(newsId);
        } else {
            throw new Error('Unauthorized')
        };
    };

    changeStatus(requestingUserId: number, newsId: number, newStatus: boolean): void | Error {
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            this.getNewsById(newsId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
