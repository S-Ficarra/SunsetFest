import { Merchandising } from "../../../../src/domain/models/facility/shop/merchandising.model";
import { MerchandisingRepository } from "../../../../src/domain/repositories/facility/shop/merchandising.repository";
import { MockOpeningTimesRepository } from "../mock.openingTimes.repository";


export class MockMerchandisingRepository implements MerchandisingRepository {

    constructor(public openingTimesRepository : MockOpeningTimesRepository,
    ){};
    

    public merchandisings: Merchandising[] = [
        new Merchandising ('hell tattoo', 123.546, 356.214, this.openingTimesRepository.openingTimesArray[0], 'tattoo'),
        new Merchandising ('hell tshirt', 987.654, 456.951, this.openingTimesRepository.openingTimesArray[0], 'tshirt')
    ];


    setFakeIdToTest(): void {
        this.merchandisings[0].setId(1)
        this.merchandisings[1].setId(2)
    };

    async getAllMerchandising(): Promise<Merchandising[]> {
        return this.merchandisings;
    }

    async getMerchandisingById(merchandisingId: number): Promise<Merchandising> {
        return this.merchandisings[merchandisingId -1];
    };

    async createMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        merchandising.setId(this.merchandisings.length + 1)
        this.merchandisings.push(merchandising);
        return merchandising;
    };

    async editMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        let merchandisingid = merchandising.getId();
        this.merchandisings[merchandisingid - 1] = merchandising;
        return merchandising;
    };

    async deleteMerchandising(merchandisingId: number): Promise<void> {
        this.merchandisings = this.merchandisings.filter(merchandising => merchandising.getId() !== merchandisingId);
    };

};