import { Band } from "../../src/domain/models/band/band.model";
import { BandService } from "../../src/services/band/band.service";
import { MockBandRepository } from "./mock.band.repository";
import { Socials } from "../../src/domain/models/band/socials.model";
import { SocialsService } from "../../src/services/band/social.service";
import { MockSocialsRepository } from "./mock.socials.repository";
import { AdministratorService } from "../../src/services/user/administrator.service";
import { EditorService } from "../../src/services/user/editor.service";
import { MockUserRepository } from "../user/mock.user.repository";


describe('BandService', () => {
    let socialsService: SocialsService;
    let socialsRepository: MockSocialsRepository;
    let bandService: BandService;
    let bandRepository: MockBandRepository;
    let administratorService : AdministratorService;
    let editorService : EditorService;
    let userRepository : MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository;
        administratorService = new AdministratorService(userRepository);
        editorService = new EditorService(userRepository);
        socialsRepository = new MockSocialsRepository;
        socialsService = new SocialsService(socialsRepository);
        userRepository.setFakeIdToTest();
        bandRepository= new MockBandRepository(socialsRepository, userRepository);
        bandService = new BandService(bandRepository, socialsService, administratorService, editorService);
        bandRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
        socialsRepository.setFakeIdToTest();
    });
    
    //getAllBand
    it('should return all bands', () => {
        const bands = bandService.getAllBand();
        expect(bands).toHaveLength(2);
        expect(bands).toEqual(expect.arrayContaining([
            expect.objectContaining({_country: 'country1', _socials: expect.objectContaining({_youtube: 'youtube1'})}),
            expect.objectContaining({_country: 'country2', _socials: expect.objectContaining({_youtube: 'youtube2'})})
        ]));
    });

    //getBandById
    it("should return a band by it's id", () => {
        let foundBand1 = bandService.getBandById(1);
        expect(foundBand1).toEqual(expect.objectContaining({_country: 'country1', _socials: expect.objectContaining({_youtube: 'youtube1'})}));
    });


    //createBand
    it('should return a band just created', () => {
        const foundBand3 = new Band ('band3', 'country3', 'text3', new Socials('fb3', 'insta3', 'twit3', 'yout3', 'spot3', 'site3', 'intspo3', 'intyout3'), new Blob, new Blob, userRepository.users[0], new Date, new Date);
        bandService.createBand(foundBand3);       
        expect(foundBand3).toEqual(expect.objectContaining({ _id: 3, _country: 'country3', _socials: expect.objectContaining({_youtube: 'yout3'})}));

    });

    
    //editBand
    it('should return a band with country3 and socials yout3 & fb3', () => {
        const bandEdited = new Band ('band3', 'country3', 'text3', new Socials('fb3', 'insta3', 'twit3', 'yout3', 'spot3', 'site3', 'intspo3', 'intyout3'), new Blob, new Blob, userRepository.users[0], new Date, new Date);
        bandEdited.setId(1)
        bandEdited.getSocials().setId(1);
        const foundBandEdited = bandService.editBand(bandEdited);
        expect(foundBandEdited).toEqual(expect.objectContaining({ _country: 'country3', _socials: expect.objectContaining({_youtube: 'yout3', _facebook: 'fb3'})}));
    })


    //deleteBand by and editor or admin
    it('should return the band list without the one with id 1', () => {
        bandService.deleteBand(2, 1)
        expect(bandRepository.bands.some(band => band.getId() === 1)).toBeFalsy();
    });


    //deleteBand by an author
    it('should return an error', () => {
        const deleteBandCall = () => bandService.deleteBand(1, 1);        
        expect(deleteBandCall).toThrow(Error);
    });



});