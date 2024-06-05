import { Facility } from "../../../src/domain/models/facility/facility.model";
import { FacilityRepository } from "../../../src/domain/repositories/facility/facility.repository";


export class MockFacilityRepository implements FacilityRepository {


    public facilities: Facility[] = [
        new Facility ('hell bar', 123.546, 356.214, 'bar'),
        new Facility ('hell bbq', 987.654, 456.951, 'restaurant')
    ];

    setFakeIdToTest(): void {
        this.facilities[0].setId(1)
        this.facilities[1].setId(2)
    };

    async getAllFacilities(): Promise<Facility[]> {
        return this.facilities;
    }

    async getFacilityById(facilityId: number): Promise<Facility> {
        return this.facilities[facilityId -1];
    };

    async createFacility(facility: Facility): Promise<Facility> {
        facility.setId(this.facilities.length + 1)
        this.facilities.push(facility);
        return facility;
    };

    async editFacility(facility: Facility): Promise<Facility> {
        let facilityid = facility.getId();
        this.facilities[facilityid - 1] = facility;
        return facility;
    };

    async deleteFacility(facilityId: number): Promise<void> {
        this.facilities = this.facilities.filter(facility => facility.getId() !== facilityId);
    };

};