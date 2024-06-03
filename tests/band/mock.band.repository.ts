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
        this.initializeBands(); //fill the array once socialRepository is defined
    };

    private initializeBands(): void {
        this.bands.push(
            new Band ('band1', 'country1', 'text1', this.socialsRepository.getSocialsById(1), new Blob, new Blob, this.userRepository.users[0], new Date, new Date),
            new Band ('band2', 'country2', 'text2', this.socialsRepository.getSocialsById(2), new Blob, new Blob, this.userRepository.users[1], new Date, new Date)    
        );
    };


    setFakeIdToTest(): void {
        this.bands[0].setId(1)
        this.bands[1].setId(2)
    };

    getAllBands(): Band[] {
        return this.bands;
    };

    getBandById(bandId: number): Band | undefined {
        return this.bands[bandId -1 ];
    };

    createBand(band: Band): Band {
        this.bands.push(band);
        const index = this.bands.length;
        band.setId(index);
        return band;
    };

    editBand(band: Band): Band {
        let bandId = band.getId();
        this.bands[bandId - 1] = band;
        return band;
    };

    deleteBand(bandId: number): void {
        this.bands = this.bands.filter(band => band.getId() !== bandId);
    };

};