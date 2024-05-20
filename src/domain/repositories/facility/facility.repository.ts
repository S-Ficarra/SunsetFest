import { Facility } from "../../models/facility/facility.model";

export interface FacilityRepository {
   
    getAllFacilities(): Facility[];
    getFacilityById(id: number): Facility | undefined;
    createFacility(facility: Facility): void;
    editFacility(facility: Facility): void;
    deleteFacility(id: number): void;

};
