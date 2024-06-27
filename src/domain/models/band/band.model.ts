import { User } from "../user/user.model";
import { Socials } from "./socials.model";

export class Band {

    private _id: number;
    private _name: string;
    private _country: string;
    private _text: string;
    private _socials: Socials;
    private _thumbnailImage: Buffer;
    private _bannerImage: Buffer;
    private _user: User;
    private _createdAt: Date;
    private _modifiedAt: Date;


    constructor(name: string, country: string, text: string, socials: Socials, thumbnailImage: Buffer, bannerImage: Buffer, user: User, createdAt: Date, modifiedAt: Date) {
        this._name = name;
        this._country = country;
        this._text = text;
        this._socials = socials;
        this._thumbnailImage = thumbnailImage;
        this._bannerImage = bannerImage;
        this._user = user;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
    };

    setId(id: number) {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setName(name: string) {
        this._name = name;
    };

    getName(): string {
        return this._name;
    };

    setCountry(country: string) {
        this._country = country;
    };

    getCountry(): string {
        return this._country;
    };

    setText(text: string) {
        this._text = text;
    };

    getText(): string {
        return this._text;
    };

    setSocials(socials: Socials) {
        this._socials = socials;
    };

    getSocials(): Socials {
        return this._socials;
    };

    setThumbnailImage(thumbnailImage: Buffer) {
        this._thumbnailImage = thumbnailImage;
    };

    getThumbnailImage(): Buffer {
        return this._thumbnailImage;
    };

    setBannerImage(bannerImage: Buffer) {
        this._bannerImage = bannerImage;
    };

    getBannerImage(): Buffer {
        return this._bannerImage;
    };

    setAuthor(userId: User) {
        this._user = userId;
    };

    getAuthor(): User {
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

};