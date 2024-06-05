import { Injectable } from "@nestjs/common";
import { Content } from "../../domain/models/publication/content.model";
import { ContentRepository } from "../../domain/repositories/publication/content.repository";

@Injectable()
export class ContentService {

    constructor(private contentRepository: ContentRepository){};

    async getAllContent(): Promise<Content[]> {
        return this.contentRepository.getAllContent();
    };

    async getContentById(contentId: number): Promise<Content> {
        return this.contentRepository.getContentById(contentId);
    };

    async createContent(content: Content): Promise<Content> {
        this.contentRepository.createContent(content);
        return content;
    };

    async editContent(content: Content): Promise<Content> {
        this.contentRepository.editContent(content);
        return content;
    };

    async deleteContent(contentId: number): Promise<void> {
        this.contentRepository.deleteContent(contentId)
    };

};

