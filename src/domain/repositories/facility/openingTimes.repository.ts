import { OpeningTimes } from "../../models/facility/openingTimes.model";

export interface OpeningTimesRepository {

    getOpeningTimesById(openingTimeId: number): OpeningTimes | undefined;
    saveOpeningTimes(openingTimes: OpeningTimes): void
    editOpeningTimes(openingTimes: OpeningTimes): void;
    deleteOpeningTimes(openingTimeId: number): void;

};
