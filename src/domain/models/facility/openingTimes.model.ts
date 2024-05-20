export class OpeningTimes {

    public openAt: Date;
    public closeAt: Date;

    constructor(openAt: Date, closeAt: Date) {
        this.openAt = openAt;
        this.closeAt = closeAt;
    };

    setOpenAt(openingTime: Date): void {
        this.openAt = openingTime;
    };

    getOpenAt(): Date {
        return this.openAt;
    };

    setCloseAt(closingTime: Date): void {
        this.closeAt = closingTime;
    };

    getCloseAt(): Date {
        return this.closeAt;
    };
};
