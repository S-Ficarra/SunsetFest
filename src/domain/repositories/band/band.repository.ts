import { Band } from "../../models/band/band.model"; 

export interface BandRepository {

    getAllBands(): Promise <Band[]>;
    getBandById(bandId: number): Promise <Band | undefined>;
    createBand(band: Band): Promise <Band>;
    editBand(band: Band): Promise <Band>;
    deleteBand(bandId: number): Promise <void>;

};
