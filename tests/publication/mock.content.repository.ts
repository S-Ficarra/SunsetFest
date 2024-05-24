import { Content } from "../../src/domain/models/publication/content.model";
import { ContentRepository } from "../../src/domain/repositories/publication/content.repository";

export class MockContentRepository implements ContentRepository {


    public content: Content[] = [
        new Content ('title1', 'text1', new Blob),
        new Content ('title2', 'text2', new Blob),
    ];

    setFakeIdToTest(): void {
        this.content[0].setId(1)
        this.content[1].setId(2)
    };

    getAllContent(): Content[] {
        return this.content;
    };

    getContentById(contentId: number): Content {
        return this.content[contentId - 1];
    };

    createContent(content: Content): void {
        this.content.push(content);
    };

    editContent(content: Content): void {
        let contentId = content.getId();
        this.content[contentId - 1] = content;
    };
    
    deleteContent(contentId: number): void {
        this.content = this.content.filter(content => content.getId() !== contentId);
    };













}