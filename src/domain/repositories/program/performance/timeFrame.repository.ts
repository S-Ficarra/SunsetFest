import { TimeFrame } from "../../../models/program/performance/timeFrame.model"

export interface TimeFrameRepository {

    getTimeFrameById(timeFrameId: number): TimeFrame | undefined;
    saveTimeFrame(timeFrame: TimeFrame): void;
    editTimeFrame(timeFrame: TimeFrame): void;
    deleteTimeFrame(timeFrameId: number): void;
    
};