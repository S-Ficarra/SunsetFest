import { Band } from "../../domain/models/band/band.model";
import { BandRepository } from "../../domain/repositories/band/band.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";
import { SocialsService } from "./social.service";

export class BandService{

    constructor(
        private bandRepository: BandRepository,
        private socialsService: SocialsService,
        private administratorService: AdministratorService,
        private editorService: EditorService,
    ){};

    getAllBand(): Band[]{
        return this.bandRepository.getAllBands();
    };

    getBandById(bandId: number): Band | undefined{
        return this.bandRepository.getBandById(bandId);
    };

    createBand(band: Band): Band {
        this.socialsService.createSocials(band.socials)
        this.bandRepository.createBand(band);    
        return band;    
    };

    editBand(band: Band): Band {
        this.socialsService.editSocials(band.socials)
        this.bandRepository.editBand(band);   
        return band;     
    };

    deleteBand(requestingUserId: number, bandId: number): void | Error {
        if (this.administratorService.isAdmin(requestingUserId) || this.editorService.isEditor(requestingUserId)){
            let band = this.bandRepository.getBandById(bandId)
            let bandSocialsId = band.getSocials()
            this.socialsService.deleteSocials(bandSocialsId.getId())
            this.bandRepository.deleteBand(bandId)
        } else {
            throw new Error ('Unauthorized');
        };
    };

};
