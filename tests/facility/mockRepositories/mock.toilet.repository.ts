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

    getAllToilets(): Toilet[] {
        return this.toilets;
    };

    getToiletById(toiletId: number): Toilet {
        return this.toilets[toiletId - 1];
    };

    createToilet(toilet: Toilet): void {
        this.toilets.push(toilet);
    };

    editToilet(toilet: Toilet): void {
        let toiletId = toilet.getId();
        this.toilets[toiletId - 1] = toilet;
    };
    
    deleteToilet(toiletId: number): void {
        this.toilets = this.toilets.filter(toilet => toilet.getId() !== toiletId);
    };

};