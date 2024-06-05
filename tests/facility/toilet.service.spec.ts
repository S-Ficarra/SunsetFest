import { Toilet } from "../../src/domain/models/facility/toilet.model";
import { ToiletService } from "../../src/services/facility/toilet.service";
import { MockToiletRepository } from "./mockRepositories/mock.toilet.repository";


describe('ToiletService', () => {
    let toiletService: ToiletService;
    let toiletRepository: MockToiletRepository;


    beforeEach(() => {
        toiletRepository = new MockToiletRepository();
        toiletService = new ToiletService(toiletRepository/*, facilityService*/);
        toiletRepository.setFakeIdToTest();
    });

    //getAllToilets
    it('Should return all toilets', async () => {
        const toilets = await toiletService.getAllToilets();
        expect(toilets).toHaveLength(2);
        expect(toilets).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'danger'}),
            expect.objectContaining({_name: 'death'})
        ]));
    });


    //getToiletById
    it('Should return the toilet id 1 with the question: question 1', async () => {
        const foundToilet1 = await toiletService.getToiletById(1);
        expect(foundToilet1).toEqual(expect.objectContaining({_name: 'danger'}));
    });


    //createToilet
    it('should return the new toilet created', async () => {
        let foundToilet3 = new Toilet ('coffin', 987.459, 415.596);
        await toiletService.createToilet(foundToilet3);
        expect(foundToilet3).toEqual(expect.objectContaining({_name: 'coffin'}));
    });


    //editToilet
    it('should return the toilet1 with question and answer edited', async () => {
        let editedToilet = new Toilet ('coffin', 125.366, 125.258);
        editedToilet.setId(1);
        toiletService.editToilet(editedToilet);
        let foundToiletEdited = await toiletService.getToiletById(1);
        expect(foundToiletEdited).toEqual(expect.objectContaining({_name: 'coffin'}));        
    });


    //deleteToilet
    it('should return the toilets array without the toilet with id 1', async () => {
        toiletService.deleteToilet(1)
        let allToilets = toiletRepository.toilets
        expect(allToilets.some(toilets => toilets.getId() === 1)).toBeFalsy();
    });


});
