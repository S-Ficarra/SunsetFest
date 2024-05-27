export class Facility {

    private _id: number;
    private _name: string;
    private _longitude: number;
    private _latitude: number;
    private _type: string;


    constructor(name: string, longitude: number, latitude: number, type: string) {
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
        this._type = type;
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

    getType(): string {
        return this._type;
    };

    setType(facilityType: string): void {
        this._type = facilityType;
    };

};