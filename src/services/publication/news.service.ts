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

    async getAllNews(): Promise<News[]>{
        return this.newsRepository.getAllNews();
    };

    async getNewsById(newsId: number): Promise<News>{
        return this.newsRepository.getNewsById(newsId);
    };

    async createNews(news: News): Promise<News> {
        this.contentService.createContent(news.getContent());
        this.newsRepository.createNews(news);   
        return news;     
    };

    async editNews(news: News): Promise<News> {
        this.contentService.editContent(news.getContent());
        this.newsRepository.editNews(news);    
        return news;         
    };

    async deleteNews(requestingUser: User, newsId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let news = await this.newsRepository.getNewsById(newsId);
            let newsContentId = news.getContent();
            this.contentService.deleteContent(newsContentId.getId());
            this.newsRepository.deleteNews(newsId);
        } else {
            throw new Error('Unauthorized')
        };
    };

    async changeStatus(requestingUser: User, newsId: number, newStatus: boolean): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            (await this.getNewsById(newsId)).setStatus(newStatus)
        } else {
            throw new Error ('Unauthorized')
        };
    };

};
