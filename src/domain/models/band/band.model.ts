import { User } from "../user/user.model";
import { Socials } from "./socials.model";

export class Band {

    private _id: number;
    private _name: string;
    private _country: string;
    private _text: string;
    private _socials: Socials;
    private _thumbnailImageUrl: string;
    private _bannerImageUrl: string;
    private _user: User;
    private _createdAt: Date;
    private _modifiedAt: Date;


    constructor(name: string, country: string, text: string, socials: Socials, thumbnailImageurl: string, bannerImageUrl: string, user: User, createdAt: Date, modifiedAt: Date) {
        this._name = name;
        this._country = country;
        this._text = text;
        this._socials = socials;
        this._thumbnailImageUrl = thumbnailImageurl;
        this._bannerImageUrl = bannerImageUrl;
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

    setThumbnailImageUrl(thumbnailImageUrl: string) {
        this._thumbnailImageUrl = thumbnailImageUrl;
    };

    getThumbnailImageUrl(): string {
        return this._thumbnailImageUrl;
    };

    setBannerImageUrl(bannerImageUrl: string) {
        this._bannerImageUrl = bannerImageUrl;
    };

    getBannerImageUrl(): string {
        return this._bannerImageUrl;
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