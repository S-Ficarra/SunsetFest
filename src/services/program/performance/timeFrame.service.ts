import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../domain/repositories/program/performance/timeFrame.repository";

export class TimeFrameService{

    constructor(private timeFrameRepository : TimeFrameRepository){};


    getTimeFrameById(timeFrameId: number): TimeFrame {
        return this.timeFrameRepository.getTimeFrameById(timeFrameId);
    };

    createTimeFrame(startingAt: Date, endingAt: Date): TimeFrame {
        let timeFrame = new TimeFrame(startingAt, endingAt)
        return this.timeFrameRepository.createTimeFrame(timeFrame);
    };


    editTimeFrame(timeFrame: TimeFrame): TimeFrame {
        this.timeFrameRepository.editTimeFrame(timeFrame);
        return timeFrame;
    };

    deleteTimeFrame(timeFrameId: number): void {
        this.timeFrameRepository.deleteTimeFrame(timeFrameId);
    };
    
};