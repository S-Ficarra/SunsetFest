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

    async getAllNews(): Promise<News[] | {}>{
        const allNews = await this.newsRepository.getAllNews();
        const allNull = allNews.every(news => news === null);
        if (allNull) {
            return ('No news found');
        }
        return allNews;
    };

    async getNewsById(newsId: number): Promise<News>{
        const news = await this.newsRepository.getNewsById(newsId);
        if(news){
            return news;
        };
        throw new Error (`News ${newsId} do not exist`);
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
            await this.newsRepository.deleteNews(newsId);
        } else {
            throw new Error('Unauthorized')
        };
    };


};
