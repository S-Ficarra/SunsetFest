import { Toilet } from "../../../src/domain/models/facility/toilet.model";
import { ToiletRepository } from "../../../src/domain/repositories/facility/toilet.repository";

export class MockToiletRepository implements ToiletRepository {


    public toilets: Toilet[] = [
        new Toilet ('danger', 125.366, 125.258),
        new Toilet ('death', 366.125, 852.258),
    ];

    setFakeIdToTest(): void {
        this.toilets[0].setId(1)
        this.toilets[1].setId(2)
    };

    async getAllToilets(): Promise<Toilet[]> {
        return this.toilets;
    };

    async getToiletById(toiletId: number): Promise<Toilet> {
        return this.toilets[toiletId - 1];
    };

    async createToilet(toilet: Toilet): Promise<Toilet> {
        this.toilets.push(toilet);
        return toilet;
    };

    async editToilet(toilet: Toilet): Promise<Toilet> {
        let toiletId = toilet.getId();
        this.toilets[toiletId - 1] = toilet;
        return toilet;
    };
    
    async deleteToilet(toiletId: number): Promise<void> {
        this.toilets = this.toilets.filter(toilet => toilet.getId() !== toiletId);
    };

};