import { Facility } from "./facility.model";

export class Camping extends Facility {

    public capacity: number;
    public amenities: Facility[];

    constructor(id: number, name: string, longitude: number, latitude: number, capacity: number, amenities: Facility[]) {
        super (id, name, longitude, latitude)
        this.capacity = capacity;
        this.amenities = amenities || [];
    };

    setCapacity(capacity: number): void {
        this.capacity = capacity;
    };

    getCapacity(): number {
        return this.capacity;
    };

    addAmenities(facility: Facility): void {
        this.amenities.push(facility);
    };

    getAmenities(): Facility[] {
        return this.amenities;
    };

};