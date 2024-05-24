import { Content } from "./content.model";
import { Publication } from "./publication.model";

export class News extends Publication{

    public content: Content;


    constructor (authorId: number, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (authorId, createdAt, modifiedAt, status, "news")
        this.content = content;
    };

    setContent(content: Content): void {
        this.content = content;
    };

    getContent(): Content {
        return this.content;
    };

};