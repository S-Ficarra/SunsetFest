export class Program {

    private _id: number;
    private _day: string;
    private _performances: Performance[];

    constructor(id: number, day: string, performances: Performance[]) {
        this._id = id;
        this._day = day;
        this._performances = performances || [];
    };

    setId(id: number) {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setDay(day: string) {
        this._day = day;
    };

    getDay(): string {
        return this._day;
    };

    addPerformance(performance: Performance): void {
        this._performances.push(performance);
    };

    getPerformances(): Performance[] {
        return this._performances;
    };

};