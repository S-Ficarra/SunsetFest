import { News } from "../../models/publication/news.model";

export interface NewsRepository {

    getAllNews(): Promise <News[]>;
    getNewsById(newsId: number): Promise <News | undefined>;
    createNews(news: News): Promise <News>;
    editNews(news: News): Promise <News>;
    deleteNews(newsId: number): Promise <void>;

};
