import { Inject } from "@nestjs/common";
import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../domain/repositories/program/performance/timeFrame.repository";

export class TimeFrameService{

    constructor( @Inject('TimeFrameRepository') private timeFrameRepository : TimeFrameRepository){};

    async getAllTimeFrame (): Promise<TimeFrame[]> {
        return await this.timeFrameRepository.getAllTimeFrame();
    }

    async getTimeFrameById(timeFrameId: number): Promise<TimeFrame> {
        return await this.timeFrameRepository.getTimeFrameById(timeFrameId);
    };

    async createTimeFrame(startingAt: Date, endingAt: Date): Promise<TimeFrame> {
        let timeFrame = new TimeFrame(startingAt, endingAt)
        return await this.timeFrameRepository.createTimeFrame(timeFrame);
    };


    async editTimeFrame(timeFrame: TimeFrame): Promise<TimeFrame> {
        await this.timeFrameRepository.editTimeFrame(timeFrame);
        return timeFrame;
    };

    async deleteTimeFrame(timeFrameId: number): Promise<void> {
        await this.timeFrameRepository.deleteTimeFrame(timeFrameId);
    };
    
};