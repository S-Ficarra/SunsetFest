export class OpeningTimes {

    private _id: number
    private _openAt: Date;
    private _closeAt: Date;

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

    getOpenAt(): Date {
        return this._openAt;
    };

    setCloseAt(closingTime: Date): void {
        this._closeAt = closingTime;
    };

    getCloseAt(): Date {
        return this._closeAt;
    };
    
};
