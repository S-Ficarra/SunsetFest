import { OpeningTimes } from "../openingTimes.model";
import { Shop } from "./shop.model";

export class Merchandising extends Shop {

    public merchType: string;

    constructor(id: number, name: string, longitude: number, latitude: number, openingTimes: OpeningTimes, merchType: string) {
        super (id, name, longitude, latitude, openingTimes);
        this.merchType = merchType;
    };

    setMerchType(merchType: string): void {
        this.merchType = merchType;
    };

    getMerchType(): string {
        return this.merchType;
    };

};