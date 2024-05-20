import { OpeningTimes } from "../../models/facility/openingTimes.model";

export interface OpeningTimesRepository {

    getOpeningTimes(): OpeningTimes | undefined;
    createOpeningTimes(openingTimes: OpeningTimes): void;
    editOpeningTimes(openingTimes: OpeningTimes): void;
    deleteOpeningTimes(): void;

};
