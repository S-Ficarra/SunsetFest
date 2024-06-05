import { PublicationType } from "./PublicationTypes";
import { User } from "../user/user.model";

export class Publication {

    private _id: number;
    private _user: User;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _status : boolean;
    private _type : string;

    constructor (user: User, createdAt: Date, modifiedAt: Date, status: boolean, type: string) {
        this._user = user;
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

    setUser(user: User): void {
        this._user = user;
    };

    getUser(): User {
        return this._user;
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
        return PublicationType[this._type];
    };

};
