import { Camping } from "../../models/facility/camping.model"; 
import { Facility } from "../../models/facility/facility.model";

export interface CampingRepository {

    getAllCampings(): Camping[];
    getCampingById(id: number): Camping | undefined;
    createCamping(camping: Camping): void;
    editCamping(camping: Camping): void;
    deleteCamping(id: number): void;
    addFacilityToCamping(facility: Facility): void;
    deleteFacilityFromCamping(facilityId: number): void;    

};
