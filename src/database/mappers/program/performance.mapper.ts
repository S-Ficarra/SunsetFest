import { Performance } from "src/domain/models/program/performance/performance.model";
import { performances } from "src/database/entities/performances.entity";
import { TimeFrame } from "src/domain/models/program/performance/timeFrame.model";
import { Band } from "src/domain/models/band/band.model";
import { Stage } from "src/domain/models/facility/stage.model";


export function mapPerformanceModeltoEntity (model: Performance, fkBand: number, fkTimeFrame: number, fkStage: number): performances {
    const entity = new performances();
    entity.band_ = fkBand;
    entity.day = model.getDay();
    entity.timeframe_ = fkTimeFrame;
    entity.stage_ = fkStage;
    return entity;
};


export function mapPerformanceEntitytoModel (performance_entity: performances, band: Band, timeFrame: TimeFrame, stage: Stage): Performance {
    const performance = new Performance (
        band,
        performance_entity.day,
        timeFrame,
        stage
    );
    performance.setId(performance_entity.id);
    return performance;
};
