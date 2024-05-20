import { Band } from "../../models/band/band.model"; 

export interface BandRepository {

    getAllBands(): Band[];
    getBandById(id: number): Band | undefined;
    createBand(band: Band): void;
    editBand(band: Band): void;
    deleteBand(id: number): void;

};
