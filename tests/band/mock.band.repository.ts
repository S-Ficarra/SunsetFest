import { MockUserRepository } from "../user/mock.user.repository";
import { Band } from "../../src/domain/models/band/band.model";
import { BandRepository } from "../../src/domain/repositories/band/band.repository";
import { Socials } from "../../src/domain/models/band/socials.model";

export class MockBandRepository implements BandRepository {

    public userRepository: MockUserRepository;
    public bands: Band[] = []; //initialize empty array


    constructor( userRepository: MockUserRepository ) {
        this.userRepository= userRepository;
        this.userRepository.setFakeIdToTest();
        this.initializeBands(); //fill the array once socialRepository is defined
    };

    public socials: Socials[] = [
        new Socials ('facebook1', 'instagram1', 'twitter1', 'youtube1', 'spotify1', 'website1', 'integrationSpotify1', 'integrationYoutube1'),
        new Socials ('facebook2', 'instagram2', 'twitter2', 'youtube2', 'spotify2', 'website2', 'integrationSpotify2', 'integrationYoutube2'),    
    ];

    setFakeIdToTestSocials(): void {
        this.socials[0].setId(1)
        this.socials[1].setId(2)
    };


    private async initializeBands(): Promise<void> {
        this.bands = [
            new Band ('band1', 'country1', 'text1', this.socials[0], 'thumbnail1', 'banner1', this.userRepository.users[0], new Date, new Date),
            new Band ('band2', 'country2', 'text2', this.socials[1], 'thumbnail2', 'banner2', this.userRepository.users[1], new Date, new Date)    
        ];
    }

    setFakeIdToTestBand(): void {
        this.bands[0].setId(1)
        this.bands[1].setId(2)
    };

    async getAllBands(): Promise<Band[]> {
        return this.bands;
    };

    async getBandById(bandId: number): Promise<Band> {
        return this.bands[bandId -1 ];
    };

    async getBandByName(name: string): Promise<Band> {
        const band = this.bands.find(band => band.getName() === name);
        return band;
    }

    async createBand(band: Band): Promise<Band> {
        this.bands.push(band);
        const index = this.bands.length;
        band.setId(index);
        return band;
    };

    async editBand(band: Band): Promise<Band> {
        let bandId = band.getId();
        this.bands[bandId - 1] = band;
        return band;
    };

    async deleteBand(bandId: number): Promise<void> {
        this.bands = this.bands.filter(band => band.getId() !== bandId);
    };

};