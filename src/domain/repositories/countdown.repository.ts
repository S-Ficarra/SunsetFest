import { Countdown } from "../models/countdown.model"; 

export interface CountdownRepository {

    getCountdown(): Countdown | undefined;
    createCountdown(countdown: Countdown): void;
    editCountdown(countdown: Countdown): void;
    deleteCountdown(): void;

};