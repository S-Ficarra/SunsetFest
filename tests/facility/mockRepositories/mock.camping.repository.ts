import { Camping } from "../../../src/domain/models/facility/camping.model";
import { CampingRepository } from "../../../src/domain/repositories/facility/camping.repository";

export class MockCampingRepository implements CampingRepository {


    public campings: Camping[] = [
        new Camping ('hell sleep', 125.366, 125.258, 20000),
        new Camping ('red sleep', 366.125, 852.258, 60000),
    ];

    setFakeIdToTest(): void {
        this.campings[0].setId(1)
        this.campings[1].setId(2)
    };

    async getAllCampings(): Promise<Camping[]> {
        return this.campings;
    };

    async getCampingById(campingId: number): Promise<Camping> {
        return this.campings[campingId - 1];
    };

    async createCamping(camping: Camping): Promise<Camping> {
        this.campings.push(camping);
        return camping;
    };

    async editCamping(camping: Camping): Promise<Camping> {
        let campingId = camping.getId();
        this.campings[campingId - 1] = camping;
        return camping;
    };
    
    async deleteCamping(campingId: number): Promise<void> {
        this.campings = this.campings.filter(camping => camping.getId() !== campingId);
    };
};