import { Socials } from "./socials.model";

export class Band {

    private _id: number;
    public name: string;
    public country: string;
    public text: string;
    public socials: Socials;
    public thumbnailImage: Blob;
    public bannerImage: Blob;
    public userId: number;
    public createdAt: Date;
    public modifiedAt: Date;


    constructor(name: string, country: string, text: string, socials: Socials, thumbnailImage: Blob, bannerImage: Blob, userId: number, createdAt: Date, modifiedAt: Date) {
        this.name = name;
        this.country = country;
        this.text = text;
        this.socials = socials;
        this.thumbnailImage = thumbnailImage;
        this.bannerImage = bannerImage;
        this.userId = userId;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    };

    setId(id: number) {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setName(name: string) {
        this.name = name;
    };

    getName(): string {
        return this.name;
    };

    setCountry(country: string) {
        this.country = country;
    };

    getCountry(): string {
        return this.country;
    };

    setText(text: string) {
        this.text = text;
    };

    getText(): string {
        return this.text;
    };

    setSocials(socials: Socials) {
        this.socials = socials;
    };

    getSocials(): Socials {
        return this.socials;
    };

    setThumbnailImage(thumbnailImage: Blob) {
        this.thumbnailImage = thumbnailImage;
    };

    getThumbnailImage(): Blob {
        return this.thumbnailImage;
    };

    setBannerImage(bannerImage: Blob) {
        this.bannerImage = bannerImage;
    };

    getBannerImage(): Blob {
        return this.bannerImage;
    };

    setAuthorId(userId: number) {
        this.userId = userId;
    };

    getAuthorId(): number {
        return this.userId;
    };

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    };

    getCreatedAt(): Date {
        return this.createdAt;
    };

    setModifiedAt(modifiedAt: Date) {
        this.modifiedAt = modifiedAt;
    };

    getModifiedAt(): Date {
        return this.modifiedAt;
    };

};