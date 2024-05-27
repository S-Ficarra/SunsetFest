import { PublicationType } from "./PublicationTypes";
import { Content } from "./content.model";
import { Publication } from "./publication.model";

export class Information extends Publication{

    private _content: Content;


    constructor (userId: number, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (userId, createdAt, modifiedAt, status, PublicationType.Information)
        this._content = content;
    };

    setContent(content: Content): void {
        this._content = content;
    };

    getContent(): Content {
        return this._content;
    };

};