import { OpeningTimes } from "../../domain/models/facility/openingTimes.model";
import { OpeningTimesRepository } from "../../domain/repositories/facility/openingTimes.repository";

export class OpeningTimesService{

    constructor(private openingTimesRepository : OpeningTimesRepository){};


    getOpeningTimesById(openingTimeId: number): OpeningTimes {
        return this.openingTimesRepository.getOpeningTimesById(openingTimeId);
    };

    saveOpeningTimes(openingTime: OpeningTimes): void {
        this.openingTimesRepository.saveOpeningTimes(openingTime);
    };

    createOpeningTimes(openAt: string, closeAt: string): OpeningTimes {
        const [openHours, openMinutes] = openAt.split(':').map(Number);
        const [closeHours, closeMinutes] = closeAt.split(':').map(Number);
        const openAtToDate = new Date();
        openAtToDate.setHours(openHours, openMinutes, 0);
        const closeAtToDate = new Date();
        closeAtToDate.setHours(closeHours, closeMinutes, 0);
        const openingTimeToSave =  new OpeningTimes(openAtToDate, closeAtToDate);
        this.saveOpeningTimes(openingTimeToSave);
        return openingTimeToSave;
    };


    editOpeningTimes(openingTimes: OpeningTimes): OpeningTimes {
        this.openingTimesRepository.editOpeningTimes(openingTimes);
        return openingTimes;
    };

    deleteOpeningTimes(openingTimeId: number): void {
        this.openingTimesRepository.deleteOpeningTimes(openingTimeId);
    };
    
};