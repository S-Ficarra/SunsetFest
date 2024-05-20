export class Facility {

    private _id: number;
    private _name: string;
    private _longitude: number;
    private _latitude: number;


    constructor(id: number, name: string, longitude: number, latitude: number) {
        this._id = id;
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
    };

    setId(id: number): void {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setName(name: string): void {
        this._name = name;
    };

    getName(): string {
        return this._name;
    };

    setLongitude(longitude: number): void {
        this._longitude = longitude;
    };

    getLongitude(): number {
        return this._longitude;
    };

    setLatitude(latitude: number): void {
        this._latitude = latitude;
    };

    getLatitude(): number {
        return this._latitude;
    };

};