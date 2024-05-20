import { Facility } from "../facility.model";
import { OpeningTimes } from "../openingTimes.model";

export class Shop extends Facility {

    public openingTimes: OpeningTimes;

    constructor(id: number, name: string, longitude: number, latitude: number, openingTimes: OpeningTimes) {
        super (id, name, longitude, latitude)
        this.openingTimes = openingTimes;
    };

    setOpeningTimes(openingTime: OpeningTimes): void {
        this.openingTimes = openingTime;
    };

    getOpeningTimes(): OpeningTimes {
        return this.openingTimes;
    };

};