import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../domain/repositories/program/performance/timeFrame.repository";

export class TimeFrameService{

    constructor(private timeFrameRepository : TimeFrameRepository){};


    getTimeFrameById(timeFrameId: number): TimeFrame {
        return this.timeFrameRepository.getTimeFrameById(timeFrameId);
    };

    saveTimeFrame(timeFrame: TimeFrame): void {
        this.timeFrameRepository.saveTimeFrame(timeFrame);
    };

    createTimeFrame(startingAt: string, endingAt: string): TimeFrame {
        const [startingHours, startingMinutes] = startingAt.split(':').map(Number);
        const [endingHours, endingMinutes] = endingAt.split(':').map(Number);
        const startingAtToDate = new Date();
        startingAtToDate.setHours(startingHours, startingMinutes, 0);
        const endingAtToDate = new Date();
        endingAtToDate.setHours(endingHours, endingMinutes, 0);
        const startingingTimeToSave =  new TimeFrame(startingAtToDate, endingAtToDate);
        this.saveTimeFrame(startingingTimeToSave);
        return startingingTimeToSave;
    };


    editTimeFrame(timeFrame: TimeFrame): TimeFrame {
        this.timeFrameRepository.editTimeFrame(timeFrame);
        return timeFrame;
    };

    deleteTimeFrame(timeFrameId: number): void {
        this.timeFrameRepository.deleteTimeFrame(timeFrameId);
    };
    
};