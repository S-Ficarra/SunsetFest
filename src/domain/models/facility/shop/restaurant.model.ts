import { FacilityType } from "../FacilityType";
import { OpeningTimes } from "../openingTimes.model";
import { Shop } from "./shop.model";

export class Restaurant extends Shop {

    private _foodType: string;

    constructor(name: string, longitude: number, latitude: number, openingTimes: OpeningTimes, foodType: string) {
        super (name, longitude, latitude, openingTimes, FacilityType.Restaurant);
        this._foodType = foodType;
    };

    setFoodType(foodType: string): void {
        this._foodType = foodType;
    };

    getFoodType(): string {
        return this._foodType;
    };

};