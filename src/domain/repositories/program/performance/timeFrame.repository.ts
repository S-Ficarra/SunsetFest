import { TimeFrame } from "../../../models/program/performance/timeFrame.model"

export interface TimeFrameRepository {

    getTimeFrameById(timeFrameId: number): TimeFrame | undefined;
    createTimeFrame(timeFrame: TimeFrame): TimeFrame;
    editTimeFrame(timeFrame: TimeFrame): TimeFrame;
    deleteTimeFrame(timeFrameId: number): void;
    
};