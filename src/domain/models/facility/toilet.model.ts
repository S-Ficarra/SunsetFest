import { Facility } from "./facility.model";

export class Toilet extends Facility {

    public gender: number;

    constructor(id: number, name: string, longitude: number, latitude: number, gender: number) {
        super (id, name, longitude, latitude)
        this.gender = gender;
    };

    setGender(gender: number): void {
        this.gender = gender;
    };

    getGender(): number {
        return this.gender;
    };

};