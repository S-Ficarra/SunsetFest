import { Toilet } from "src/domain/models/facility/toilet.model";
import { ToiletRepository } from "src/domain/repositories/facility/toilet.repository";

export class ToiletService {

    constructor(private toiletRepository: ToiletRepository){};

    getAllToilets(): Toilet[] {
        return this.toiletRepository.getAllToilets();
    };

    getToiletById(toiletId: number): Toilet {
        return this.toiletRepository.getToiletById(toiletId);
    };

    createToilet(toilet: Toilet): Toilet {
        this.toiletRepository.createToilet(toilet);
        return toilet;
    };

    editToilet(toilet: Toilet): Toilet {
        this.toiletRepository.editToilet(toilet);
        return toilet;
    };

    deleteToilet(toiletId: number): void {
        this.toiletRepository.deleteToilet(toiletId);
    };

};