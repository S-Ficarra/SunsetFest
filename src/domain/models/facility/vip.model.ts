import { FacilityType } from "./FacilityType";
import { Facility } from "./facility.model";


export class Vip extends Facility {

    constructor(name: string, longitude: number, latitude: number) {
        super (name, longitude, latitude, FacilityType.Vip)
    };

};