import { Facility } from "./facility.model";

export class Vip extends Facility {

    public amenities: Facility[];

    constructor(id: number, name: string, longitude: number, latitude: number, amenities: Facility[]) {
        super (id, name, longitude, latitude)
        this.amenities = amenities || [];
    };

    addAmenities(facility: Facility): void {
        this.amenities.push(facility);
    };

    getAmenities(): Facility[] {
        return this.amenities;
    };

};