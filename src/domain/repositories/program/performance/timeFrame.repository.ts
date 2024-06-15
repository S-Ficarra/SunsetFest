import { TimeFrame } from "../../../models/program/performance/timeFrame.model"

export interface TimeFrameRepository {

    getTimeFrameById(timeFrameId: number): Promise <TimeFrame | undefined>;
    getAllTimeFrame(): Promise <TimeFrame[]>;
    createTimeFrame(timeFrame: TimeFrame): Promise <TimeFrame>;
    editTimeFrame(timeFrame: TimeFrame): Promise <TimeFrame>;
    deleteTimeFrame(timeFrameId: number): Promise <void>;
    
};