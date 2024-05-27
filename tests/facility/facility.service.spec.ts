import { Facility } from "../../src/domain/models/facility/facility.model";
import { FacilityService } from "../../src/services/facility/facility.service";
import { MockFacilityRepository } from "./mockRepositories/mock.facility.repository";

 
describe('FacilityService', () => {
    let facilityService: FacilityService;
    let facilityRepository: MockFacilityRepository;

    beforeEach(() => {
        facilityRepository = new MockFacilityRepository();
        facilityService = new FacilityService(facilityRepository);
        facilityRepository.setFakeIdToTest();
    });

    //getFacilityById
    it("Sould return a facility by it's id", () => {
        const foundFacility1 = facilityService.getFacilityById(1);
        expect(foundFacility1).toEqual(expect.objectContaining({ _id: 1, _name: 'hell bar'}));
    });

    //getAllFacilities
    it('should return all facility', () => {
        const facilitys = facilityService.getAllFacilities();
        expect(facilitys).toHaveLength(2);
        expect(facilitys).toEqual(expect.arrayContaining([
            expect.objectContaining({_id: 1, _name: 'hell bar'}),
            expect.objectContaining({_id: 2, _name: 'hell bbq'}),
        ])); 
    });

    //createFacility
    it('should return a facility just created', () => {
        facilityService.createFacility(new Facility('hell tacos', 159.753, 875.132, 'restaurant'));
        const foundFacility = facilityService.getFacilityById(3);
        expect(foundFacility).toEqual(expect.objectContaining({ _id: 3, _name: 'hell tacos'}));
    });

    //editFacility
    it('should return the facility edited with the modification', () => {
        const editedFacility = new Facility('hell tacos', 159.753, 875.132, 'restaurant');
        editedFacility.setId(1)
        facilityService.editFacility(editedFacility);
        const editedFacilityFounded = facilityService.getFacilityById(1)
        expect(editedFacilityFounded).toEqual(expect.objectContaining({ _id: 1, _name: 'hell tacos'}));
    });

    //deletePublicatio 
    it('should delete the facility with the id 1', () => {
        facilityService.deleteFacility(1);
        const facilitys = facilityService.getAllFacilities();
        expect(facilitys).toHaveLength(1);
        expect(facilitys.some(facility => facility.getId() === 1)).toBeFalsy();
    });

});