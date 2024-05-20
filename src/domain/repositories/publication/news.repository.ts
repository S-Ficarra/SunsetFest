import { Publication } from "../../models/publication/publication.model";
import { News } from "../../models/publication/news.model";
import { PublicationRepository } from "./publication.repository";

export interface NewsRepository extends PublicationRepository {

    getAllNews(): News[];
    getNewsById(id: number): News | undefined;
    createNews(news: News): void;
    editNews(news: News): void;
    deleteNews(id: number): void;

};
