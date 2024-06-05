import { Content } from "../../models/publication/content.model";

export interface ContentRepository {

    getAllContent(): Promise <Content[]>;
    getContentById(contentId: number): Promise <Content | undefined>;
    createContent(content: Content): Promise <Content>;
    editContent(content: Content): Promise <Content>;
    deleteContent(contentId: number): Promise <void>;
    
}; 