import { Camping } from "../../models/facility/camping.model"; 

export interface CampingRepository {

    getAllCampings(): Promise <Camping[]>;
    getCampingById(campingId: number): Promise <Camping | undefined>;
    createCamping(camping: Camping): Promise <Camping>;
    editCamping(camping: Camping): Promise <Camping>;
    deleteCamping(campingId: number): Promise <void>;

};
