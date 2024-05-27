import { OpeningTimesService } from "../../../../src/services/facility/openingTimes.service";
import { Merchandising } from "../../../../src/domain/models/facility/shop/merchandising.model";
import { MerchandisingRepository } from "../../../../src/domain/repositories/facility/shop/merchandising.repository";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";


export class MockMerchandisingRepository implements MerchandisingRepository {

    constructor(public openingTimesService : OpeningTimesService){};


    public merchandising1OT = this.openingTimesService.createOpeningTimes('08:00', '17:00');
    public merchandising2OT = this.openingTimesService.createOpeningTimes('09:00', '20:00');
    

    public merchandisings: Merchandising[] = [
        new Merchandising ('hell tattoo', 123.546, 356.214, this.merchandising1OT, 'tattoo'),
        new Merchandising ('hell tshirt', 987.654, 456.951, this.merchandising2OT, 'tshirt')
    ];

    createOpeningTimes(): OpeningTimes {
        let newOpeningTime = this.openingTimesService.createOpeningTimes('11:30', '23:00');
        return newOpeningTime;
    }

    setFakeIdToTest(): void {
        this.merchandisings[0].setId(1)
        this.merchandisings[1].setId(2)
    };

    getAllMerchandising(): Merchandising[] {
        return this.merchandisings;
    }

    getMerchandisingById(merchandisingId: number): Merchandising | undefined {
        return this.merchandisings[merchandisingId -1];
    };

    createMerchandising(merchandising: Merchandising): void {
        merchandising.setId(this.merchandisings.length + 1)
        this.merchandisings.push(merchandising);
        
    };

    editMerchandising(merchandising: Merchandising): void {
        let merchandisingid = merchandising.getId();
        this.merchandisings[merchandisingid - 1] = merchandising;
    };

    deleteMerchandising(merchandisingId: number): void {
        this.merchandisings = this.merchandisings.filter(merchandising => merchandising.getId() !== merchandisingId);
    };

};