import { Author } from "../user/author.model";
import { Socials } from "./socials.model";

export class Band {

    public id: number;
    public name: string;
    public country: string;
    public text: string;
    public socials: Socials;
    public thumbnailImage: Blob;
    public bannerImage: Blob;
    public authorId: Author;
    public createdAt: Date;
    public modifiedAt: Date;


    constructor(id: number, name: string, country: string, text: string, socials: Socials, thumbnailImage: Blob, bannerImage: Blob, authorId: Author, createdAt: Date, modifiedAt: Date) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.text = text;
        this.socials = socials;
        this.thumbnailImage = thumbnailImage;
        this.bannerImage = bannerImage;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    };

    setId(id: number) {
        this.id = id;
    };

    getId(): number {
        return this.id;
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

    setAuthorId(authorId: Author) {
        this.authorId = authorId;
    };

    getAuthorId(): Author {
        return this.authorId;
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