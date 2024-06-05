import { Injectable } from "@nestjs/common";
import { Facility } from "src/domain/models/facility/facility.model";
import { FacilityRepository } from "src/domain/repositories/facility/facility.repository";

@Injectable()
export class FacilityService {

    constructor(private facilityRepository: FacilityRepository){}
    
    
    async getAllFacilities(): Promise<Facility[]> {
        return this.facilityRepository.getAllFacilities();
    };

    async getFacilityById(facilityid: number): Promise<Facility> {
        return this.facilityRepository.getFacilityById(facilityid);
    };

    async createFacility(facility: Facility): Promise<Facility> {
        this.facilityRepository.createFacility(facility);
        return facility;
    };

    async editFacility(facility: Facility): Promise<Facility> {
        this.facilityRepository.editFacility(facility);
        return facility;
    };

    async deleteFacility(facilityid: number): Promise<void> {
        this.facilityRepository.deleteFacility(facilityid);
    };


};