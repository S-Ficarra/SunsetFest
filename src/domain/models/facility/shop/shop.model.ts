import { Facility } from "../facility.model";
import { OpeningTimes } from "./openingTimes.model";

export class Shop extends Facility {

    private _openingTimes: OpeningTimes;

    constructor(name: string, longitude: number, latitude: number, openingTimes: OpeningTimes, type: string) {
        super (name, longitude, latitude, type)
        this._openingTimes = openingTimes;
    };

    setOpeningTimes(openingTime: OpeningTimes): void {
        this._openingTimes = openingTime;
    };

    getOpeningTimes(): OpeningTimes {
        return this._openingTimes;
    };

};