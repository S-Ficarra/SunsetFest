import { OpeningTimes } from "../../domain/models/facility/openingTimes.model";
import { OpeningTimesRepository } from "../../domain/repositories/facility/openingTimes.repository";

export class OpeningTimesService{

    constructor(private openingTimesRepository : OpeningTimesRepository){};


    async getOpeningTimesById(openingTimeId: number): Promise<OpeningTimes> {
        return this.openingTimesRepository.getOpeningTimesById(openingTimeId);
    };


    async createOpeningTimes(openAt: Date, closeAt: Date): Promise<OpeningTimes> {
        let openingTimes = new OpeningTimes(openAt, closeAt)
        return this.openingTimesRepository.createOpeningTimes(openingTimes);
    };


    async editOpeningTimes(openingTimes: OpeningTimes): Promise<OpeningTimes> {
        this.openingTimesRepository.editOpeningTimes(openingTimes);
        return openingTimes;
    };

    async deleteOpeningTimes(openingTimeId: number): Promise<void> {
        this.openingTimesRepository.deleteOpeningTimes(openingTimeId);
    };
    
};