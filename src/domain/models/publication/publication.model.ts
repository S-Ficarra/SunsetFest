import { Author } from "../user/author.model";

export class Publication {

    private _id: number;
    private _authorId: Author;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _status : boolean;

    constructor (id: number, authorId: Author, createdAt: Date, modifiedAt: Date, status: boolean) {
        this._id = id;
        this._authorId = authorId;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
        this._status = status;
    }

    setId(value: number): void {
        this._id = value;
    };

    getId(): number {
        return this._id;
    };

    setAuthorId(authorId: Author): void {
        this._authorId = authorId;
    };

    getAuthorId(): Author {
        return this._authorId;
    };

    setCreatedAt(createdAt: Date) {
        this._createdAt = createdAt;
    };

    getCreatedAt(): Date {
        return this._createdAt;
    };

    setModifiedAt(modifiedAt: Date) {
        this._modifiedAt = modifiedAt;
    };

    getModifiedAt(): Date {
        return this._modifiedAt;
    };

    setStatus(status: boolean): void {
        this._status = status;
    };

    getStatus(): boolean {
        return this._status;
    };

};
