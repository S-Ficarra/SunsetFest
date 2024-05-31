export class TimeFrame {

    private _id : number;
    private _startingTime: Date;
    private _endingTime: Date;

    constructor (startingTime: Date, endingTime: Date) {
        this._startingTime = startingTime;
        this._endingTime = endingTime;
    };

    setId(id: number): void {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setStartingTime(startingTime: Date): void {
        this._startingTime = startingTime;
    };

    getStartingTime(): Date {
        return this._startingTime;
    };

    setEndingTime(endingTime: Date): void {
        this._endingTime = endingTime;
    };

    getEndingTime(): Date {
        return this._endingTime;
    };

};