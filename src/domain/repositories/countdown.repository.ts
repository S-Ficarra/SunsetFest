import { Countdown } from "../models/countdown.model"; 

export interface CountdownRepository {

    getAllCountdowns(): Promise <Countdown []>;
    getCountdownById(countdownId: number): Promise <Countdown | undefined>;
    createCountdown(countdown: Countdown): Promise <Countdown>;
    editCountdown(countdown: Countdown): Promise <Countdown>;
    deleteCountdown(countdownId: number): Promise <void>;

};