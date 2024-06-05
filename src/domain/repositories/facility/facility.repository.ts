import { Facility } from "../../models/facility/facility.model";

export interface FacilityRepository {
   
    getAllFacilities(): Promise <Facility[]>;
    getFacilityById(facilityid: number): Promise <Facility | undefined>;
    createFacility(facility: Facility): Promise <Facility>;
    editFacility(facility: Facility): Promise <Facility>;
    deleteFacility(facilityid: number): Promise <void>;

};
