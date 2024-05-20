import { Facility } from "./facility.model";

export class Map {

    public facilities: Facility[];

    constructor(facilities: Facility[]) {
        this.facilities = facilities || [];
    };

    addFacility(facility: Facility): void {
        this.facilities.push(facility);
    };

    getFacilities(): Facility[] {
        return this.facilities;
    };

};