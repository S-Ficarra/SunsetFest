import { Performance } from "./performance/performance.model";

export class Program {

    private _id: number;
    private _performances: Performance[];

    constructor(performances: Performance[]) {
        this._performances = performances || [];
    };

    setId(id: number): void {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    addPerformance(performance: Performance): void {
        this._performances.push(performance);
    };

    getPerformances(): Performance[] {
        return this._performances;
    };

};