import { Camping } from "../../models/facility/camping.model"; 

export interface CampingRepository {

    getAllCampings(): Camping[];
    getCampingById(campingId: number): Camping | undefined;
    createCamping(camping: Camping): void;
    editCamping(camping: Camping): void;
    deleteCamping(campingId: number): void;

};
