import { Band } from "../../models/band/band.model"; 

export interface BandRepository {

    getAllBands(): Band[];
    getBandById(bandId: number): Band | undefined;
    createBand(band: Band): Band;
    editBand(band: Band): Band;
    deleteBand(bandId: number): void;

};
