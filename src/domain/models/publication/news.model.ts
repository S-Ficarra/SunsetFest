import { User } from "../user/user.model";
import { PublicationType } from "./PublicationTypes";
import { Content } from "./content.model";
import { Publication } from "./publication.model";


export class News extends Publication{

    private _content: Content;


    constructor (userId: User, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (userId, createdAt, modifiedAt, status, PublicationType.News)
        this._content = content;
    };

    setContent(content: Content): void {
        this._content = content;
    };

    getContent(): Content {
        return this._content;
    };

};