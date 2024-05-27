export class OpeningTimes {

    private _id: number
    private _openAt: Date;
    private _closeAt: Date;

    private formatTime(time: Date): string {
        let hours: string | number = time.getHours();
        let minutes: string | number = time.getMinutes();

        hours = (hours < 10) ? '' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    constructor(openAt: Date, closeAt: Date) {
        this._openAt = openAt;
        this._closeAt = closeAt;
    };

    setId(id: number): void {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setOpenAt(openingTime: Date): void {
        this._openAt = openingTime;
    };

    getOpenAt(): string {
        return this.formatTime(this._openAt);
    };

    setCloseAt(closingTime: Date): void {
        this._closeAt = closingTime;
    };

    getCloseAt(): string {
        return this.formatTime(this._closeAt);
    };
    
};
