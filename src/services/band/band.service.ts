import { User } from "../../domain/models/user/user.model";
import { Band } from "../../domain/models/band/band.model";
import { BandRepository } from "../../domain/repositories/band/band.repository";
import { RoleService } from "../user/role.service";
import { SocialsService } from "./social.service";

export class BandService{

    constructor(
        private bandRepository: BandRepository,
        private socialsService: SocialsService,
        private roleService: RoleService,
    ){};

    async getAllBand(): Promise<Band[]>{
        return this.bandRepository.getAllBands();
    };

    async getBandById(bandId: number): Promise<Band>{
        return this.bandRepository.getBandById(bandId);
    };

    async createBand(band: Band): Promise<Band> {
        this.socialsService.createSocials(band.getSocials())
        this.bandRepository.createBand(band);    
        return band;    
    };

    async editBand(band: Band): Promise<Band> {
        this.socialsService.editSocials(band.getSocials())
        this.bandRepository.editBand(band);   
        return band;     
    };

    async deleteBand(requestingUser: User, bandId: number): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            let band = await this.bandRepository.getBandById(bandId)
            let bandSocialsId = band.getSocials()
            await this.socialsService.deleteSocials(bandSocialsId.getId())
            this.bandRepository.deleteBand(bandId)
        } else {
            throw new Error ('Unauthorized');
        };
    };

};
