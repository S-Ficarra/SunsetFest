export class Countdown {

    public startingDateAndTime: Date;
    public endingDateAndTime: Date;

    constructor(startingDateAndTime: Date, endingDateAndTime: Date) {
        this.startingDateAndTime = startingDateAndTime;
        this.endingDateAndTime = endingDateAndTime;
    };

    setStartingDateAndTime(startingDateAndTime: Date): void {
        this.startingDateAndTime = startingDateAndTime;
    };

    getStartingDateAndTime(): Date {
        return this.startingDateAndTime;
    };

    setEndingDateAndTime(endingDateAndTime: Date): void {
        this.endingDateAndTime = endingDateAndTime;
    };

    getEndingDateAndTime(): Date {
        return this.endingDateAndTime;
    };


};