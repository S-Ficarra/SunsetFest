import { Countdown } from "../models/countdown.model"; 

export interface CountdownRepository {

    getAllCountdowns(): Countdown [] | undefined;
    getCountdownById(countdownId: number): Countdown | undefined;
    createCountdown(countdown: Countdown): void | Countdown;
    editCountdown(countdown: Countdown): void | Countdown;
    deleteCountdown(countdownId: number): void;

};