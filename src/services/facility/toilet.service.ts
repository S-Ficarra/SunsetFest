import { Inject } from "@nestjs/common";
import { Toilet } from "src/domain/models/facility/toilet.model";
import { ToiletRepository } from "src/domain/repositories/facility/toilet.repository";


export class ToiletService {

    constructor(
        @Inject('ToiletRepository') private toiletRepository: ToiletRepository
    ){};

    async getAllToilets(): Promise<Toilet[]> {
        return await this.toiletRepository.getAllToilets();
    };

    async getToiletById(toiletId: number): Promise<Toilet> {
        const toilet = await this.toiletRepository.getToiletById(toiletId);
        if (toilet) {
            return toilet;
        };
        throw new Error (`Toilet ${toiletId} do not exist`);
    };

    async createToilet(toilet: Toilet): Promise<Toilet> {
        await this.toiletRepository.createToilet(toilet);
        return toilet;
    };

    async editToilet(toilet: Toilet): Promise<Toilet> {
        await this.toiletRepository.editToilet(toilet);
        return toilet;
    };

    async deleteToilet(toiletId: number): Promise<void> {
        await this.toiletRepository.deleteToilet(toiletId);
    };

};