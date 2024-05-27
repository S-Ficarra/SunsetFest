import { Band } from "../../src/domain/models/band/band.model";
import { BandService } from "../../src/services/band/band.service";
import { MockBandRepository } from "./mock.band.repository";
import { Socials } from "../../src/domain/models/band/socials.model";
import { SocialsService } from "../../src/services/band/social.service";
import { MockSocialsRepository } from "./mock.socials.repository";


describe('BandService', () => {
    let socialsService: SocialsService;
    let socialsRepository: MockSocialsRepository;
    let bandService: BandService;
    let bandRepository: MockBandRepository;


    beforeEach(() => {
        socialsRepository = new MockSocialsRepository;
        socialsService = new SocialsService(socialsRepository);
        bandRepository= new MockBandRepository(socialsRepository);
        bandService = new BandService(bandRepository, socialsService);
        bandRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
        socialsRepository.setFakeIdToTest();
    });
    
    //getAllBand
    it('should return all band', () => {
        const bands = bandService.getAllBand();
        expect(bands).toHaveLength(2);
        expect(bands).toEqual(expect.arrayContaining([
            expect.objectContaining({country: 'country1', socials: expect.objectContaining({youtube: 'youtube1'})}),
            expect.objectContaining({country: 'country2', socials: expect.objectContaining({youtube: 'youtube2'})})
        ]));
    });

    //getBandById
    it("should return a band by it's id", () => {
        let foundBand1 = bandService.getBandById(1);
        expect(foundBand1).toEqual(expect.objectContaining({country: 'country1', socials: expect.objectContaining({youtube: 'youtube1'})}));
    });


    //createBand
    it('should return a band just created', () => {
        const foundBand3 = new Band ('band3', 'country3', 'text3', new Socials('fb3', 'insta3', 'twit3', 'yout3', 'spot3', 'site3', 'intspo3', 'intyout3'), new Blob, new Blob, 3, new Date, new Date);
        bandService.createBand(foundBand3);
        expect(foundBand3).toEqual(expect.objectContaining({ _id: 3, country: 'country3', socials: expect.objectContaining({youtube: 'yout3'})}));

    });

    
    //editBand
    it('should return a band with titleEdited and textEdited', () => {
        const bandEdited = new Band ('band3', 'country3', 'text3', new Socials('fb3', 'insta3', 'twit3', 'yout3', 'spot3', 'site3', 'intspo3', 'intyout3'), new Blob, new Blob, 3, new Date, new Date);
        bandEdited.setId(1)
        bandEdited.socials.setId(1);
        const foundBandEdited = bandService.editBand(bandEdited);
        expect(foundBandEdited).toEqual(expect.objectContaining({ country: 'country3', socials: expect.objectContaining({youtube: 'yout3', facebook: 'fb3'})}));
    })


    //deleteBand
    it('should return the band list without the one with id 3', () => {
        const bandToDelete = bandService.getBandById(1);
        bandService.deleteBand(bandToDelete.getId())
        expect(bandRepository.bands.some(band => band.getId() === 3)).toBeFalsy();
    })



});