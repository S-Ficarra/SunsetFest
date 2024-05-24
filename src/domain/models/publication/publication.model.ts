
export class Publication {

    private _id: number;
    private _authorId: number;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _status : boolean;
    private _type : string;

    constructor (authorId: number, createdAt: Date, modifiedAt: Date, status: boolean, type: string) {
        this._authorId = authorId;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
        this._status = status;
        this._type = type;
    }

    setId(value: number): void {
        this._id = value;
    };

    getId(): number {
        return this._id;
    };

    setAuthorId(authorId: number): void {
        this._authorId = authorId;
    };

    getAuthorId(): number {
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

    setType(type: string): void {
        this._type = type;
    };

    getType(): string {
        return this._type;
    };

};
