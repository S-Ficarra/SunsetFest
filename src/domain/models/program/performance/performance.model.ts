import { Band } from "../../band/band.model";
import { Stage } from "../../facility/stage.model";
import { Days } from "./DayEnum";
import { TimeFrame } from "./timeFrame.model";

export class Performance {

    private _id: number;
    private _bandId: Band;
    private _day: number
    private _timeFrameId: TimeFrame;
    private _stageId: Stage;


    constructor(bandId: Band, day: number, timeFrameId: TimeFrame, stageId: Stage) {
        this._bandId = bandId;
        this._day = day,
        this._timeFrameId = timeFrameId;
        this._stageId = stageId;
    };

    setId(id: number) {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setBand(bandId: Band) {
        this._bandId = bandId;
    };

    getBand(): Band {
        return this._bandId;
    };

    getDay(): string {
        return Days[this._day]
    };

    setDay(day: number): void {
        this._day = day;
    };

    setTimeFrame(timeFrameId: TimeFrame) {
        this._timeFrameId = timeFrameId;
    };

    getTimeFrame(): TimeFrame {
        return this._timeFrameId;
    };

    setStage(stageId: Stage) {
        this._stageId = stageId;
    };

    getStage(): Stage {
        return this._stageId;
    };
    
};