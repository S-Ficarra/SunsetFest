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

    getAllFacilities(): Facility[] {
        return this.facilities;
    }

    getFacilityById(facilityId: number): Facility | undefined {
        return this.facilities[facilityId -1];
    };

    createFacility(facility: Facility): void {
        facility.setId(this.facilities.length + 1)
        this.facilities.push(facility);
        
    };

    editFacility(facility: Facility): void {
        let facilityid = facility.getId();
        this.facilities[facilityid - 1] = facility;
    };

    deleteFacility(facilityId: number): void {
        this.facilities = this.facilities.filter(facility => facility.getId() !== facilityId);
    };

};