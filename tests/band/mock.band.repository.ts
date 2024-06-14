import { MockUserRepository } from "../user/mock.user.repository";
import { Band } from "../../src/domain/models/band/band.model";
import { BandRepository } from "../../src/domain/repositories/band/band.repository";
import { MockSocialsRepository } from "./mock.socials.repository";

export class MockBandRepository implements BandRepository {

    public socialsRepository: MockSocialsRepository; //import social mock repo to use Socials created in it
    public userRepository: MockUserRepository;
    public bands: Band[] = []; //initialize empty array


    constructor(socialsRepository: MockSocialsRepository, userRepository: MockUserRepository ) {
        this.userRepository= userRepository;
        this.userRepository.setFakeIdToTest();
        this.socialsRepository = socialsRepository;
        this.socialsRepository.setFakeIdToTest();
        this.initializeBands(); //fill the array once socialRepository is defined
    };

    private async initializeBands(): Promise<void> {

        this.bands = [
            new Band ('band1', 'country1', 'text1', this.socialsRepository.socials[0], Buffer.from('thumbnail1'), Buffer.from('banner1'), this.userRepository.users[0], new Date, new Date),
            new Band ('band2', 'country2', 'text2', this.socialsRepository.socials[1], Buffer.from('thumbnail2'), Buffer.from('banner2'), this.userRepository.users[1], new Date, new Date)    
        ];
    }

    setFakeIdToTest(): void {
        this.bands[0].setId(1)
        this.bands[1].setId(2)
    };

    async getAllBands(): Promise<Band[]> {
        return this.bands;
    };

    async getBandById(bandId: number): Promise<Band> {
        return this.bands[bandId -1 ];
    };

    async  getBandByName(name: string): Promise<Band> {
        throw new Error('method not implemented in mock repository')
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