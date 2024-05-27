import { FacilityType } from "./FacilityType";
import { Facility } from "./facility.model";

export class Camping extends Facility {

    private _capacity: number;

    constructor(name: string, longitude: number, latitude: number, capacity: number) {
        super (name, longitude, latitude, FacilityType.Camping)
        this._capacity = capacity;
    };

    setCapacity(capacity: number): void {
        this._capacity = capacity;
    };

    getCapacity(): number {
        return this._capacity;
    };


};