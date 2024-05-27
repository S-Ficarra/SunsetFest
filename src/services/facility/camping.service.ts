import { Camping } from "src/domain/models/facility/camping.model";
import { CampingRepository } from "src/domain/repositories/facility/camping.repository";

export class CampingService{

    constructor(private campingRepository : CampingRepository){};
    

    getAllCampings(): Camping[] {
        return this.campingRepository.getAllCampings();
    };

    getCampingById(campingId: number): Camping {
        return this.campingRepository.getCampingById(campingId);
    };

    createCamping(camping: Camping): Camping {
        this.campingRepository.createCamping(camping);
        return camping;
    };

    editCamping(camping: Camping): Camping {
        this.campingRepository.editCamping(camping);
        return camping;
    };

    deleteCamping(campingId: number): void {
        this.campingRepository.deleteCamping(campingId);
    };


};