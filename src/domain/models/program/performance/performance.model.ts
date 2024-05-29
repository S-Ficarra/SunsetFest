import { Days } from "./DayEnum";

export class Performance {

    private _id: number;
    private _bandId: number;
    private _day: number
    private _timeFrameId: number;
    private _stageId: number;


    constructor(bandId: number, day: number, timeFrameId: number, stageId: number) {
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

    setBand(bandId: number) {
        this._bandId = bandId;
    };

    getBand(): number {
        return this._bandId;
    };

    getDay(): string {
        return Days[this._day]
    };

    setDay(day: number): void {
        this._day = day;
    };

    setTimeFrame(timeFrameId: number) {
        this._timeFrameId = timeFrameId;
    };

    getTimeFrame(): number {
        return this._timeFrameId;
    };

    setStage(stageId: number) {
        this._stageId = stageId;
    };

    getStage(): number {
        return this._stageId;
    };
    
};