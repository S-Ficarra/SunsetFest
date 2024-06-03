import { TimeFrame } from "../../../src/domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../src/domain/repositories/program/performance/timeFrame.repository";

export class MockTimeFrameRepository implements TimeFrameRepository {


    public timeFrameArray: TimeFrame[] = [
        new TimeFrame(
            new Date(2000, 0, 0, 8, 0, 0), // start at 08:00
            new Date(2000, 0, 0, 10, 0, 0) // end at 10:00
        ),
        new TimeFrame(
            new Date(2000, 0, 0, 10, 0, 0), // start at 10:00
            new Date(2000, 0, 0, 12, 0, 0) // end at 12:00
        ),
    ];

    setFakeIdToTest(): void {
        this.timeFrameArray[0].setId(1)
        this.timeFrameArray[1].setId(2)
    };


    getAllTimeFrame(): TimeFrame[] {
        return this.timeFrameArray;
    };

    getTimeFrameById(timeFrameId: number): TimeFrame {
        return this.timeFrameArray.find(tf => tf.getId() === timeFrameId);
    };

    createTimeFrame(timeFrame: TimeFrame): TimeFrame {
        timeFrame.setId(this.timeFrameArray.length);
        this.timeFrameArray.push(timeFrame);
        return timeFrame
    };

    editTimeFrame(timeFrame: TimeFrame): TimeFrame {
        let timeFrameId = timeFrame.getId();
        this.timeFrameArray[timeFrameId - 1] = timeFrame;
        return timeFrame
    }

    deleteTimeFrame(timeFrameId: number): void {
        this.timeFrameArray = this.timeFrameArray.filter(tf => tf.getId() !== timeFrameId);
    };
};
