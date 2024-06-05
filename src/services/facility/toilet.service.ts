import { Toilet } from "src/domain/models/facility/toilet.model";
import { ToiletRepository } from "src/domain/repositories/facility/toilet.repository";

export class ToiletService {

    constructor(private toiletRepository: ToiletRepository){};

    async getAllToilets(): Promise<Toilet[]> {
        return this.toiletRepository.getAllToilets();
    };

    async getToiletById(toiletId: number): Promise<Toilet> {
        return this.toiletRepository.getToiletById(toiletId);
    };

    async createToilet(toilet: Toilet): Promise<Toilet> {
        this.toiletRepository.createToilet(toilet);
        return toilet;
    };

    async editToilet(toilet: Toilet): Promise<Toilet> {
        this.toiletRepository.editToilet(toilet);
        return toilet;
    };

    async deleteToilet(toiletId: number): Promise<void> {
        this.toiletRepository.deleteToilet(toiletId);
    };

};