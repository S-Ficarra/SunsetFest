import { Injectable } from "@nestjs/common";
import { Socials } from "../../domain/models/band/socials.model";
import { SocialsRepository } from "../../domain/repositories/band/socials.repository";

@Injectable()
export class SocialsService {

    constructor (private socialsRepository: SocialsRepository){};

    getSocialsById(socialsId: number): Socials | undefined { 
        return this.socialsRepository.getSocialsById(socialsId);
    };

    createSocials(socials: Socials): void {
        this.socialsRepository.createSocials(socials);
    };

    editSocials(socials: Socials): void {
        this.socialsRepository.editSocials(socials);
    };

    deleteSocials(socialId: number): void {
        this.socialsRepository.deleteSocials(socialId);
    };


};