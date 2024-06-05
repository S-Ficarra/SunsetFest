import { OpeningTimes } from "../../models/facility/openingTimes.model";

export interface OpeningTimesRepository {

    getOpeningTimesById(openingTimeId: number): Promise <OpeningTimes | undefined>;
    createOpeningTimes(openingTimes: OpeningTimes): Promise <OpeningTimes>;
    editOpeningTimes(openingTimes: OpeningTimes): Promise <OpeningTimes>;
    deleteOpeningTimes(openingTimeId: number): Promise <void>;

};
