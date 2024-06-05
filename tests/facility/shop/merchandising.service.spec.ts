import { OpeningTimesService } from "../../../src/services/facility/openingTimes.service";
import { Merchandising } from "../../../src/domain/models/facility/shop/merchandising.model";
import { MerchandisingService } from "../../../src/services/facility/shop/merchandising.service";
import { MockMerchandisingRepository } from "../mockRepositories/mockShopRepositotory/mock.merchandising.repository";
import { MockOpeningTimesRepository } from "../mockRepositories/mock.openingTimes.repository";



describe('MerchandisingService', () => {
    let merchandisingService: MerchandisingService;
    let merchandisingRepository: MockMerchandisingRepository;
    let openingTimesService: OpeningTimesService;
    let openingTimesRepository: MockOpeningTimesRepository;


    beforeEach(() => {
        openingTimesRepository = new MockOpeningTimesRepository();
        openingTimesService = new OpeningTimesService(openingTimesRepository);
        merchandisingRepository = new MockMerchandisingRepository(openingTimesRepository, openingTimesService);
        merchandisingService = new MerchandisingService(merchandisingRepository);
        merchandisingRepository.setFakeIdToTest();
    });

    //getAllMerchandisings
    it('Should return all merchandisings', async () => {
        const merchandisings = await merchandisingService.getAllMerchandising();
        expect(merchandisings).toHaveLength(2);
        expect(merchandisings).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'hell tattoo', _merchType: 'tattoo'}),
            expect.objectContaining({_name: 'hell tshirt', _merchType: 'tshirt'})
        ]));
    });


    //getMerchandisingById
    it('Should return the merchandising id 1', async () => {
        const foundMerchandising1 = await merchandisingService.getMerchandisingById(1);
        expect(foundMerchandising1).toEqual(expect.objectContaining({_name: 'hell tattoo', _merchType: 'tattoo'}));
    });


    //createMerchandising
    it('should return the new merchandising created', async () => {
        let merchandising3OT = openingTimesRepository.openingTimesArray[1];
        let foundMerchandising3 = new Merchandising ('hell jewel', 987.654, 456.951, merchandising3OT, 'jewel');
        await merchandisingService.createMerchandising(foundMerchandising3);
        expect(foundMerchandising3).toEqual(expect.objectContaining({_name:'hell jewel', _merchType: 'jewel'}));
    });


    //editMerchandising
    it('should return the merchandising1 with name and foddType edited', async () => {
        let merchandising3OT = openingTimesRepository.openingTimesArray[0];
        let editedMerchandising = new Merchandising ('hell jewel', 987.654, 456.951, merchandising3OT, 'jewel');
        editedMerchandising.setId(1);
        let foundMerchandisingEdited = await merchandisingService.editMerchandising(editedMerchandising);
        expect(foundMerchandisingEdited).toEqual(expect.objectContaining({_name: 'hell jewel', _merchType: 'jewel'}));        
    });


    //deleteMerchandising
    it('should return the merchandisings array without the merchandising with id 1', async () => {
        merchandisingService.deleteMerchandising(1)
        let allMerchandisings = merchandisingRepository.merchandisings
        expect(allMerchandisings.some(merchandisings => merchandisings.getId() === 1)).toBeFalsy();
    });


});
 