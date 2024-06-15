import { OpeningTimes } from "../../../src/domain/models/facility/openingTimes.model";

export class MockOpeningTimesRepository {


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

};
