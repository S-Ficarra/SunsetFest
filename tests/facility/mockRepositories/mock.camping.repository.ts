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

    getAllCampings(): Camping[] {
        return this.campings;
    };

    getCampingById(campingId: number): Camping {
        return this.campings[campingId - 1];
    };

    createCamping(camping: Camping): void {
        this.campings.push(camping);
    };

    editCamping(camping: Camping): void {
        let campingId = camping.getId();
        this.campings[campingId - 1] = camping;
    };
    
    deleteCamping(campingId: number): void {
        this.campings = this.campings.filter(camping => camping.getId() !== campingId);
    };
};