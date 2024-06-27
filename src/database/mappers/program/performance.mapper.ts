import { Performance } from "../../../domain/models/program/performance/performance.model";
import { performances } from "../../../database/entities/performances.entity";
import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { Band } from "../../../domain/models/band/band.model";
import { Stage } from "../../../domain/models/facility/stage.model";
import { bands } from "../../../database/entities/bands.entity";
import { timeframes } from "../../../database/entities/timeframes.entity";
import { stages } from "../../../database/entities/stages.entity";


export function mapPerformanceModeltoEntity (model: Performance, band: bands, stage: stages, timeFrame: timeframes): performances {
    const entity = new performances();
    entity.band_ = band;
    entity.timeframe_ = timeFrame;
    entity.stage_ = stage;
    return entity;
};

export function mapPerformanceModeltoEntityEdit (model: Performance, band: bands, stage: stages, timeFrame: timeframes): performances {
    const entity = new performances();
    entity.id = model.getId();
    entity.band_ = band;
    entity.timeframe_ = timeFrame;
    entity.stage_ = stage;
    return entity;
};


export function mapPerformanceEntitytoModel (performance_entity: performances, band: Band, timeFrame: TimeFrame, stage: Stage): Performance {
    const performance = new Performance (
        band,
        timeFrame,
        stage
    );
    performance.setId(performance_entity.id);
    return performance;
};
