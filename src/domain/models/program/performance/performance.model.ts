import { Band } from "../../band/band.model";
import { Stage } from "../../facility/stage.model";
import { Days } from "./DayEnum";
import { TimeFrame } from "./timeFrame.model";

export class Performance {

    private _id: number;
    private _band: Band;
    private _timeFrame: TimeFrame;
    private _stage: Stage;


    constructor(band: Band, timeFrame: TimeFrame, stage: Stage) {
        this._band = band;
        this._timeFrame = timeFrame;
        this._stage = stage;
    };

    setId(id: number) {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setBand(band: Band) {
        this._band = band;
    };

    getBand(): Band {
        return this._band;
    };

    setTimeFrame(timeFrame: TimeFrame) {
        this._timeFrame = timeFrame;
    };

    getTimeFrame(): TimeFrame {
        return this._timeFrame;
    };

    setStage(stage: Stage) {
        this._stage = stage;
    };

    getStage(): Stage {
        return this._stage;
    };
    
};