import { Content } from "../../models/publication/content.model";

export interface ContentRepository {

    getAllContent(): Content[];
    getContentById(contentId: number): Content | undefined;
    createContent(content: Content): void;
    editContent(content: Content): void;
    deleteContent(contentId: number): void;
    
}; 