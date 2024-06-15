import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../domain/repositories/program/performance/timeFrame.repository";

export class TimeFrameService{

    constructor(private timeFrameRepository : TimeFrameRepository){};

    async getAllTimeFrame (): Promise<TimeFrame[]> {
        return this.timeFrameRepository.getAllTimeFrame();
    }

    async getTimeFrameById(timeFrameId: number): Promise<TimeFrame> {
        return this.timeFrameRepository.getTimeFrameById(timeFrameId);
    };

    async createTimeFrame(startingAt: Date, endingAt: Date): Promise<TimeFrame> {
        let timeFrame = new TimeFrame(startingAt, endingAt)
        return this.timeFrameRepository.createTimeFrame(timeFrame);
    };


    async editTimeFrame(timeFrame: TimeFrame): Promise<TimeFrame> {
        this.timeFrameRepository.editTimeFrame(timeFrame);
        return timeFrame;
    };

    async deleteTimeFrame(timeFrameId: number): Promise<void> {
        this.timeFrameRepository.deleteTimeFrame(timeFrameId);
    };
    
};