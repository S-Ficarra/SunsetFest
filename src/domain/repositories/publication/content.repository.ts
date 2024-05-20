import { Content } from "../../models/publication/content.model";

export interface ContentRepository {

    getAllContent(): Content[];
    getContentByTitle(title: string): Content | undefined;
    createContent(content: Content): void;
    editContent(content: Content): void;
    deleteContent(title: string): void;
    
}; 