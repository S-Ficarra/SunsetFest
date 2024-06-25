import { FacilityType } from "../FacilityType";
import { OpeningTimes } from "./openingTimes.model";
import { Shop } from "./shop.model";

export class Bar extends Shop {

    constructor(name: string, longitude: number, latitude: number, openingTimes: OpeningTimes) {
        super (name, longitude, latitude, openingTimes, FacilityType.Bar);
    };

};