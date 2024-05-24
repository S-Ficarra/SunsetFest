import { Band } from "../../domain/models/band/band.model";
import { BandRepository } from "../../domain/repositories/band/band.repository";
import { SocialsService } from "./social.service";
//import { PublicationService } from "./publication.service";

export class BandService{

    constructor(
        private bandRepository: BandRepository,
        private socialsService: SocialsService,
        //private publicationService: PublicationService
    ){};

    getAllBand(): Band[]{
        return this.bandRepository.getAllBands();
    };

    getBandById(bandId: number): Band | undefined{
        return this.bandRepository.getBandById(bandId);
    };

    createBand(band: Band): void {
        //this.publicationService.createPublication(band);
        this.socialsService.createSocials(band.socials)
        this.bandRepository.createBand(band);        
    };

    editBand(band: Band): void {
        //this.publicationService.editPublication(band)
        this.socialsService.editSocials(band.socials)
        this.bandRepository.editBand(band);        
    };

    deleteBand(bandId: number): void {
        let band = this.bandRepository.getBandById(bandId)
        let bandSocialsId = band.getSocials()
        this.socialsService.deleteSocials(bandSocialsId.getId())
        this.bandRepository.deleteBand(bandId)
    }

};
