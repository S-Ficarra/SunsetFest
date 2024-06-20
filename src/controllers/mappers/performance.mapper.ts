import { Band } from "src/domain/models/band/band.model";
import { Stage } from "src/domain/models/facility/stage.model";
import { Performance } from "src/domain/models/program/performance/performance.model";
import { TimeFrame } from "src/domain/models/program/performance/timeFrame.model";



export function mapPerformanceDtoToModel (band: Band, stage: Stage, timeFrame: TimeFrame){

    const performance = new Performance(
        band,
        timeFrame,
        stage
    );
    
    return performance;

};


export function mapPerformanceDtoToModelEdit (perfToEdit: Performance, band: Band, stage: Stage, timeFrame: TimeFrame) {

    perfToEdit.setBand(band);
    perfToEdit.setStage(stage);
    perfToEdit.setTimeFrame(timeFrame);

    return perfToEdit;
    
};