import { OpeningTimes } from "../../../src/domain/models/facility/openingTimes.model";
import { OpeningTimesRepository } from "../../../src/domain/repositories/facility/openingTimes.repository";

export class MockOpeningTimesRepository implements OpeningTimesRepository {


    public openingTimesArray: OpeningTimes[] = [
        new OpeningTimes(
            new Date(2000, 0, 0, 8, 0, 0), // Open at 08:00
            new Date(2000, 0, 0, 17, 0, 0) // Close at 17:00
        ),
        new OpeningTimes(
            new Date(2000, 0, 0, 9, 0, 0), // Open at 09:00
            new Date(2000, 0, 0, 18, 0, 0) // Close at 18:00
        ),
    ];

    setFakeIdToTest(): void {
        this.openingTimesArray[0].setId(1)
        this.openingTimesArray[1].setId(2)
    };


    async getOpeningTimesById(openingTimesId: number): Promise<OpeningTimes> {
        return this.openingTimesArray.find(ot => ot.getId() === openingTimesId);
    };

    async createOpeningTimes(openingTimes: OpeningTimes): Promise<OpeningTimes> {
        openingTimes.setId(3);
        this.openingTimesArray.push(openingTimes);
        return openingTimes;
    };

    async editOpeningTimes(openingTimes: OpeningTimes): Promise<OpeningTimes> {
        let openingTimesId = openingTimes.getId();
        this.openingTimesArray[openingTimesId - 1] = openingTimes;
        return openingTimes;
    };

    async deleteOpeningTimes(openingTimesId: number): Promise<void> {
        this.openingTimesArray = this.openingTimesArray.filter(ot => ot.getId() !== openingTimesId);
    };
};
