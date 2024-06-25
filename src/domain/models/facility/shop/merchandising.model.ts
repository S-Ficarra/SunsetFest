import { FacilityType } from "../FacilityType";
import { OpeningTimes } from "./openingTimes.model";
import { Shop } from "./shop.model";

export class Merchandising extends Shop {

    private _merchType: string;

    constructor(name: string, longitude: number, latitude: number, openingTimes: OpeningTimes, merchType: string) {
        super (name, longitude, latitude, openingTimes, FacilityType.Merchandising);
        this._merchType = merchType;
    };

    setMerchType(merchType: string): void {
        this._merchType = merchType;
    };

    getMerchType(): string {
        return this._merchType;
    };

};