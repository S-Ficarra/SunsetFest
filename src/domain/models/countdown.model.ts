export class Countdown {

    private _startingDateAndTime: Date;
    private _endingDateAndTime: Date;

    constructor(startingDateAndTime: Date, endingDateAndTime: Date) {
        this._startingDateAndTime = startingDateAndTime;
        this._endingDateAndTime = endingDateAndTime;
    };

    setStartingDateAndTime(_startingDateAndTime: Date): void {
        this._startingDateAndTime = _startingDateAndTime;
    };

    getStartingDateAndTime(): Date {
        return this._startingDateAndTime;
    };

    setEndingDateAndTime(endingDateAndTime: Date): void {
        this._endingDateAndTime = endingDateAndTime;
    };

    getEndingDateAndTime(): Date {
        return this._endingDateAndTime;
    };


};