import { Injectable } from "@nestjs/common";
import { Socials } from "../../domain/models/band/socials.model";
import { SocialsRepository } from "../../domain/repositories/band/socials.repository";

@Injectable()
export class SocialsService {

    constructor (private socialsRepository: SocialsRepository){};

    async getSocialsById(socialsId: number): Promise<Socials> { 
        return this.socialsRepository.getSocialsById(socialsId);
    };

    async createSocials(socials: Socials): Promise<Socials> {
        return this.socialsRepository.createSocials(socials);
    };

    async editSocials(socials: Socials): Promise<Socials> {
        return this.socialsRepository.editSocials(socials);
    };

    async deleteSocials(socialId: number): Promise<void> {
        this.socialsRepository.deleteSocials(socialId);
    };


};