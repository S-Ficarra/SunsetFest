import { Inject } from "@nestjs/common";
import { Camping } from "src/domain/models/facility/camping.model";
import { CampingRepository } from "src/domain/repositories/facility/camping.repository";

export class CampingService{

    constructor( @Inject('CampingRepository') private campingRepository : CampingRepository){};
    

    async getAllCampings(): Promise<Camping[]> {
        return await this.campingRepository.getAllCampings();
    };

    async getCampingById(campingId: number): Promise<Camping> {
        const camping = await this.campingRepository.getCampingById(campingId);
        if (camping) {
            return camping;
        };
        throw new Error (`Camping ${campingId} do not exist`);
    };

    async createCamping(camping: Camping): Promise<Camping> {
        const createdCamping = await this.campingRepository.createCamping(camping);
        return createdCamping;
    };

    async editCamping(camping: Camping): Promise<Camping> {
        const editedCamping = await this.campingRepository.editCamping(camping);
        return editedCamping;
    };

    async deleteCamping(campingId: number): Promise<void> {
        await this.campingRepository.deleteCamping(campingId);
    };


};