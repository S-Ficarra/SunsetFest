import { Author } from "../user/author.model";
import { Content } from "./content.model";
import { Publication } from "./publication.model";

export class Information extends Publication{

    public content: Content;

    constructor (id: number, authorId: Author, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (id, authorId, createdAt, modifiedAt, status)
        this.content = content;
    };

    setContent(content: Content): void {
        this.content = content;
    };

    getContent(): Content {
        return this.content;
    };

};