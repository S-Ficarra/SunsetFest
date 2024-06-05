import { Camping } from "src/domain/models/facility/camping.model";
import { CampingRepository } from "src/domain/repositories/facility/camping.repository";

export class CampingService{

    constructor(private campingRepository : CampingRepository){};
    

    async getAllCampings(): Promise<Camping[]> {
        return this.campingRepository.getAllCampings();
    };

    async getCampingById(campingId: number): Promise<Camping> {
        return this.campingRepository.getCampingById(campingId);
    };

    async createCamping(camping: Camping): Promise<Camping> {
        this.campingRepository.createCamping(camping);
        return camping;
    };

    async editCamping(camping: Camping): Promise<Camping> {
        this.campingRepository.editCamping(camping);
        return camping;
    };

    async deleteCamping(campingId: number): Promise<void> {
        this.campingRepository.deleteCamping(campingId);
    };


};