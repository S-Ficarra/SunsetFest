import { User } from "../../domain/models/user/user.model";
import { News } from "../../domain/models/publication/news.model";
import { NewsRepository } from "../../domain/repositories/publication/news.repository";
import { RoleService } from "../user/role.service";
import { Inject } from "@nestjs/common";

export class NewsService{

    constructor(
        @Inject('NewsRepository') private newsRepository: NewsRepository,
        private roleService : RoleService,
    ){};

    async getAllNews(): Promise<News[]>{
        return this.newsRepository.getAllNews();
    };

    async getNewsById(newsId: number): Promise<News>{
        const news = this.newsRepository.getNewsById(newsId);
        if(news){
            return news;
        };
        throw new Error
    };

    async createNews(news: News): Promise<News> {
        const newsCreated = await this.newsRepository.createNews(news);   
        return newsCreated;     
    };

    async editNews(news: News): Promise<News> {
        const newsEdited = await this.newsRepository.editNews(news);    
        return newsEdited;         
    };

    async deleteNews(requestingUser: User, newsId: number): Promise<void> {
        if (this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
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
