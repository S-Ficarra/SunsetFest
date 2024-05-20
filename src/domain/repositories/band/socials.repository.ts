import { Socials } from "../../models/band/socials.model"; 

export interface SocialsRepository {

    getSocials(): Socials | undefined;
    createSocials(socials: Socials): void;
    editSocials(socials: Socials): void;
    deleteSocials(): void;


};
