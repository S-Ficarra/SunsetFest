import { TimeFrame } from "../../../models/program/performance/timeFrame.model"

export interface TimeFrameRepository {

    getTimeFrame(): TimeFrame | undefined;
    createTimeFrame(timeFrame: TimeFrame): void;
    editTimeFrame(timeFrame: TimeFrame): void;
    deleteTimeFrame(): void;
    
};