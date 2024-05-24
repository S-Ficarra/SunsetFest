import { Injectable } from "@nestjs/common";
import { Content } from "../../domain/models/publication/content.model";
import { ContentRepository } from "../../domain/repositories/publication/content.repository";

@Injectable()
export class ContentService {

    constructor(private contentRepository: ContentRepository){};

    getAllContent(): Content[] {
        return this.contentRepository.getAllContent();
    };

    getContentById(contentId: number): Content | undefined {
        return this.contentRepository.getContentById(contentId);
    };

    createContent(content: Content): void {
        this.contentRepository.createContent(content);
    };

    editContent(content: Content): void {
        this.contentRepository.editContent(content);
    };

    deleteContent(contentId: number): void {
        this.contentRepository.deleteContent(contentId)
    };

};

