import { User } from "../../domain/models/user/user.model";
import { News } from "../../domain/models/publication/news.model";
import { NewsRepository } from "../../domain/repositories/publication/news.repository";
import { RoleService } from "../user/role.service";
import { ContentService } from "./content.service";

export class NewsService{

    constructor(
        private newsRepository: NewsRepository,
        private contentService: ContentService,
        private roleService : RoleService,
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

    deleteNews(requestingUser: User, newsId: number): void | Error {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let news = this.newsRepository.getNewsById(newsId);
            let newsContentId = news.getContent();
            this.contentService.deleteContent(newsContentId.getId());
            this.newsRepository.deleteNews(newsId);
        } else {
            throw new Error('Unauthorized')
        };
    };

    changeStatus(requestingUser: User, newsId: number, newStatus: boolean): void | Error {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            this.getNewsById(newsId).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
