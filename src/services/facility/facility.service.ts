import { Injectable } from "@nestjs/common";
import { Facility } from "src/domain/models/facility/facility.model";
import { FacilityRepository } from "src/domain/repositories/facility/facility.repository";

@Injectable()
export class FacilityService {

    constructor(private facilityRepository: FacilityRepository){}
    
    
    getAllFacilities(): Facility[] {
        return this.facilityRepository.getAllFacilities();
    };

    getFacilityById(facilityid: number): Facility {
        return this.facilityRepository.getFacilityById(facilityid);
    };

    createFacility(facility: Facility): void {
        this.facilityRepository.createFacility(facility);
    };

    editFacility(facility: Facility): void {
        this.facilityRepository.editFacility(facility);
    };

    deleteFacility(facilityid: number): void {
        this.facilityRepository.deleteFacility(facilityid);
    };


};