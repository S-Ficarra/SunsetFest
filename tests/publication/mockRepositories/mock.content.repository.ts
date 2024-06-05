import { Content } from "../../../src/domain/models/publication/content.model";
import { ContentRepository } from "../../../src/domain/repositories/publication/content.repository";

export class MockContentRepository implements ContentRepository {


    public content: Content[] = [
        new Content ('title1', 'text1', new Blob),
        new Content ('title2', 'text2', new Blob),
    ];

    setFakeIdToTest(): void {
        this.content[0].setId(1)
        this.content[1].setId(2)
    };

    async getAllContent(): Promise<Content[]> {
        return this.content;
    };

    async getContentById(contentId: number): Promise<Content> {
        return this.content[contentId - 1];
    };

    async createContent(content: Content): Promise<Content> {
        this.content.push(content);
        return content;
    };

    async editContent(content: Content): Promise<Content> {
        let contentId = content.getId();
        this.content[contentId - 1] = content;
        return content;
    };
    
    async deleteContent(contentId: number): Promise<void> {
        this.content = this.content.filter(content => content.getId() !== contentId);
    };













}