import { Socials } from "../../models/band/socials.model"; 

export interface SocialsRepository {

    getSocialsById(socialsId: number): Promise <Socials | undefined>;
    createSocials(socials: Socials): Promise <Socials>;
    editSocials(socials: Socials): Promise <Socials>;
    deleteSocials(socialId: number): Promise <void>;

};
