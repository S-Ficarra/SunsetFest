import { OpeningTimes } from "../../src/domain/models/facility/openingTimes.model";
import { OpeningTimesService } from "../../src/services/facility/openingTimes.service";
import { MockOpeningTimesRepository } from "./mockRepositories/mock.openingTimes.repository";


describe('OpeningTimesService', () => {
    let openingTimesService: OpeningTimesService;
    let openingTimesRepository: MockOpeningTimesRepository;


    beforeEach(() => {
        openingTimesRepository = new MockOpeningTimesRepository();
        openingTimesService = new OpeningTimesService(openingTimesRepository);
        openingTimesRepository.setFakeIdToTest();     
    });


    //getOpeningTimesById
    it('Should return the openingTimes id 1 with the time 07:00 & 16:00', async () => {
        const foundOpeningTimes1 = await openingTimesService.getOpeningTimesById(1);
        expect(foundOpeningTimes1).toEqual(openingTimesRepository.openingTimesArray[0]);
    });


    //createOpeningTimes
    it('should return the new openingTimes created', async () => {
        let openAt = new Date(0, 0, 0, 6, 0, 0); // Open at 09:00
        let closeAt = new Date(0, 0, 0, 22, 0, 0); // Close at 18:00
        let foundOpeningTimes3 = await openingTimesService.createOpeningTimes(openAt, closeAt);
        expect(foundOpeningTimes3).toEqual(openingTimesRepository.openingTimesArray[2]);
    });


    //editOpeningTimes
    it('should return the openingTimes1 with time edited', async () => {
        let editedOpeningTimes = new OpeningTimes(
            new Date(0, 0, 0, 6, 0, 0), // Open at 09:00
            new Date(0, 0, 0, 22, 0, 0) // Close at 18:00
        );
        editedOpeningTimes.setId(1);
        let foundOpeningTimesEdited = await openingTimesService.editOpeningTimes(editedOpeningTimes);
        expect(foundOpeningTimesEdited).toEqual(expect.objectContaining(openingTimesRepository.openingTimesArray[0]));        
    });


    //deleteOpeningTimes
    it('should return the openingTimess array without the openingTimes with id1', () => {
        openingTimesService.deleteOpeningTimes(1)
        let allOpeningTimes = openingTimesRepository.openingTimesArray
        expect(allOpeningTimes.some(openingTimes => openingTimes.getId() === 1)).toBeFalsy();
    });


});
