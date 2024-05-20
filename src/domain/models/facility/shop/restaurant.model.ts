import { OpeningTimes } from "../openingTimes.model";
import { Shop } from "./shop.model";

export class Restaurant extends Shop {

    public foodType: string;

    constructor(id: number, name: string, longitude: number, latitude: number, openingTimes: OpeningTimes, foodType: string) {
        super (id, name, longitude, latitude, openingTimes);
        this.foodType = foodType;
    };

    setFoodType(foodType: string): void {
        this.foodType = foodType;
    };

    getFoodType(): string {
        return this.foodType;
    };

};