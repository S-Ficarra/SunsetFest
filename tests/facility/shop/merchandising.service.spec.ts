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
        merchandisingRepository = new MockMerchandisingRepository(openingTimesService);
        merchandisingService = new MerchandisingService(merchandisingRepository);
        merchandisingRepository.setFakeIdToTest();
    });

    //getAllMerchandisings
    it('Should return all merchandisings', () => {
        const merchandisings = merchandisingService.getAllMerchandising();
        expect(merchandisings).toHaveLength(2);
        expect(merchandisings).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'hell tattoo', _merchType: 'tattoo'}),
            expect.objectContaining({_name: 'hell tshirt', _merchType: 'tshirt'})
        ]));
    });


    //getMerchandisingById
    it('Should return the merchandising id 1', () => {
        const foundMerchandising1 = merchandisingService.getMerchandisingById(1);
        expect(foundMerchandising1).toEqual(expect.objectContaining({_name: 'hell tattoo', _merchType: 'tattoo'}));
    });


    //createMerchandising
    it('should return the new merchandising created', () => {
        let merchandising3OT = merchandisingRepository.createOpeningTimes();
        let foundMerchandising3 = new Merchandising ('hell jewel', 987.654, 456.951, merchandising3OT, 'jewel');
        merchandisingService.createMerchandising(foundMerchandising3);
        expect(foundMerchandising3).toEqual(expect.objectContaining({_name:'hell jewel', _merchType: 'jewel'}));
    });


    //editMerchandising
    it('should return the merchandising1 with name and foddType edited', () => {
        let merchandising3OT = merchandisingRepository.createOpeningTimes();
        let editedMerchandising = new Merchandising ('hell jewel', 987.654, 456.951, merchandising3OT, 'jewel');
        editedMerchandising.setId(1);
        let foundMerchandisingEdited = merchandisingService.editMerchandising(editedMerchandising);
        expect(foundMerchandisingEdited).toEqual(expect.objectContaining({_name: 'hell jewel', _merchType: 'jewel'}));        
    });


    //deleteMerchandising
    it('should return the merchandisings array without the merchandising with id 1', () => {
        merchandisingService.deleteMerchandising(1)
        let allMerchandisings = merchandisingRepository.merchandisings
        expect(allMerchandisings.some(merchandisings => merchandisings.getId() === 1)).toBeFalsy();
    });


});
 