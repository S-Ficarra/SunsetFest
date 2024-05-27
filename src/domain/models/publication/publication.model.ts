
export class Publication {

    private _id: number;
    private _userId: number;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _status : boolean;
    private _type : string;

    constructor (userId: number, createdAt: Date, modifiedAt: Date, status: boolean, type: string) {
        this._userId = userId;
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

    setAuthorId(userId: number): void {
        this._userId = userId;
    };

    getAuthorId(): number {
        return this._userId;
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
