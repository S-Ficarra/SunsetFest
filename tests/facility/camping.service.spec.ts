import { Camping } from "../../src/domain/models/facility/camping.model";
import { CampingService } from "../../src/services/facility/camping.service";
import { MockCampingRepository } from "./mockRepositories/mock.camping.repository";


describe('CampingService', () => {
    let campingService: CampingService;
    let campingRepository: MockCampingRepository;


    beforeEach(() => {
        campingRepository = new MockCampingRepository();
        campingService = new CampingService(campingRepository/*, facilityService*/);
        campingRepository.setFakeIdToTest();
    });

    //getAllCampings
    it('Should return all campings', async () => {
        const campings = await campingService.getAllCampings();
        expect(campings).toHaveLength(2);
        expect(campings).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'hell sleep', _capacity: 20000}),
            expect.objectContaining({_name: 'red sleep', _capacity: 60000})
        ]));
    });


    //getCampingById
    it('Should return the camping id 1 with the question: question 1', async () => {
        const foundCamping1 = await campingService.getCampingById(1);
        expect(foundCamping1).toEqual(expect.objectContaining({_name: 'hell sleep', _capacity: 20000}));
    });


    //createCamping
    it('should return the new camping created', async () => {
        let foundCamping3 = new Camping ('leppard sleep', 987.459, 415.596, 666);
        await campingService.createCamping(foundCamping3);
        expect(foundCamping3).toEqual(expect.objectContaining({_name:'leppard sleep', _capacity: 666}));
    });


    //editCamping
    it('should return the camping1 with question and answer edited', async () => {
        let editedCamping = new Camping ('leppard sleep', 125.366, 125.258, 999);
        editedCamping.setId(1);
        let foundCampingEdited = await campingService.editCamping(editedCamping);
        expect(foundCampingEdited).toEqual(expect.objectContaining({_name: 'leppard sleep', _capacity: 999}));        
    });


    //deleteCamping
    it('should return the campings array without the camping with id1', async () => {
        campingService.deleteCamping(1)
        let allCampings = await campingRepository.campings
        expect(allCampings.some(campings => campings.getId() === 1)).toBeFalsy();
    });


});
