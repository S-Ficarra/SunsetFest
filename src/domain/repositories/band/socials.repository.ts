import { Socials } from "../../models/band/socials.model"; 

export interface SocialsRepository {

    getSocialsById(socialsId: number): Socials | undefined;
    createSocials(socials: Socials): void;
    editSocials(socials: Socials): void;
    deleteSocials(socialId: number): void;

};
