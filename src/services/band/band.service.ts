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

    getAllBand(): Band[]{
        return this.bandRepository.getAllBands();
    };

    getBandById(bandId: number): Band | undefined{
        return this.bandRepository.getBandById(bandId);
    };

    createBand(band: Band): Band {
        this.socialsService.createSocials(band.getSocials())
        this.bandRepository.createBand(band);    
        return band;    
    };

    editBand(band: Band): Band {
        this.socialsService.editSocials(band.getSocials())
        this.bandRepository.editBand(band);   
        return band;     
    };

    deleteBand(requestingUser: User, bandId: number): void | Error {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            let band = this.bandRepository.getBandById(bandId)
            let bandSocialsId = band.getSocials()
            this.socialsService.deleteSocials(bandSocialsId.getId())
            this.bandRepository.deleteBand(bandId)
        } else {
            throw new Error ('Unauthorized');
        };
    };

};
