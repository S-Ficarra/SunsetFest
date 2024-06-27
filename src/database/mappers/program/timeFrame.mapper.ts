import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { timeframes } from "../../../database/entities/timeframes.entity";

export function mapTimeFrameToEntity (model: TimeFrame): timeframes{
    const entity = new timeframes();
    entity.starting_time = model.getStartingTime();
    entity.ending_time = model.getEndingTime();
    return entity;
};

export function mapTimeFrameToModel (entity: timeframes): TimeFrame {
    
    const timeFrame = new TimeFrame (
        entity.starting_time,
        entity.ending_time
    );

    timeFrame.setId(entity.id);
    return timeFrame;
};