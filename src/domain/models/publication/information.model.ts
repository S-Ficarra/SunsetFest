import { Content } from "./content.model";
import { Publication } from "./publication.model";

export class Information extends Publication{

    public content: Content;


    constructor (authorId: number, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (authorId, createdAt, modifiedAt, status, "information")
        this.content = content;
    };

    setContent(content: Content): void {
        this.content = content;
    };

    getContent(): Content {
        return this.content;
    };

};