export class Countdown {

    private _id: number;
    private _name: string;
    private _startingDateAndTime: Date;
    private _endingDateAndTime: Date;

    constructor(name: string, endingDateAndTime: Date) {
        this._name = name;
        this._endingDateAndTime = endingDateAndTime;
    };

    getId(): number {
        return this._id;
    };

    setId(id: number): void {
        this._id = id;
    };

    getName(): string {
        return this._name;
    };

    setName(name: string): void {
        this._name = name;
    };

    setEndingDateAndTime(endingDateAndTime: Date): void {
        this._endingDateAndTime = endingDateAndTime;
    };

    getEndingDateAndTime(): Date {
        return this._endingDateAndTime;
    };


};