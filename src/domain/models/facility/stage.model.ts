import { Facility } from "./facility.model";

export class Stage extends Facility{

    public capacity: number;

    constructor(id: number, name: string, longitude: number, latitude: number, capacity: number) {
        super (id, name, longitude, latitude)
        this.capacity = capacity;
    };

    setCapacity(capacity: number): void {
        this.capacity = capacity;
    };

    getCapacity(): number {
        return this.capacity;
    };
};