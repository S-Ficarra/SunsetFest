export class TimeFrame {

    private _id : number;
    private _startingTime: Date;
    private _endingTime: Date;

    private formatTime(time: Date): string {
        let hours: string | number = time.getHours();
        let minutes: string | number = time.getMinutes();

        hours = (hours < 10) ? '' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

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

    getStartingTime(): string {
        return this.formatTime(this._startingTime);
    };

    setEndingTime(endingTime: Date): void {
        this._endingTime = endingTime;
    };

    getEndingTime(): string {
        return this.formatTime(this._endingTime);
    };

};