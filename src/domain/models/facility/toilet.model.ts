import { FacilityType } from "./FacilityType";
import { Facility } from "./facility.model";

export class Toilet extends Facility {

    constructor(name: string, longitude: number, latitude: number) {
        super (name, longitude, latitude, FacilityType.Toilets)
    };

};