import { User } from "../user/user.model";
import { PublicationType } from "./PublicationTypes";
import { Content } from "./content.model";
import { Illustrated } from "./illustrated.model";

export class Information extends Illustrated{


    constructor (user: User, createdAt: Date, modifiedAt: Date, status: boolean, content: Content) {
        super (user, createdAt, modifiedAt, status, content, PublicationType.Information)
    };

};