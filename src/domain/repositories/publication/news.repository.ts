import { News } from "../../models/publication/news.model";

export interface NewsRepository {

    getAllNews(): News[];
    getNewsById(newsId: number): News | undefined;
    createNews(news: News): void;
    editNews(news: News): void;
    deleteNews(newsId: number): void;

};
