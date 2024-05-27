import { Facility } from "../../models/facility/facility.model";

export interface FacilityRepository {
   
    getAllFacilities(): Facility[];
    getFacilityById(facilityid: number): Facility | undefined;
    createFacility(facility: Facility): void;
    editFacility(facility: Facility): void;
    deleteFacility(facilityid: number): void;

};
