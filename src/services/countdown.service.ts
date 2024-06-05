import { Countdown } from "src/domain/models/countdown.model";
import { CountdownRepository } from "src/domain/repositories/countdown.repository";

export class CountdownService{


    constructor(private countdownRepository: CountdownRepository){};


    async getAllCountdowns(): Promise<Countdown[]> {
        return this.countdownRepository.getAllCountdowns();
    };

    async getCountdownById(countdownId: number): Promise<Countdown> {
        return this.countdownRepository.getCountdownById(countdownId);
    };

    async createCountdown(countdown: Countdown): Promise<Countdown> {
        this.countdownRepository.createCountdown(countdown);
        return countdown;
    };

    async editCountdown(countdown: Countdown): Promise<Countdown> {
        this.countdownRepository.editCountdown(countdown);
        return countdown;
    };

    async deleteCountdown(countdownId: number): Promise<void> {
        this.countdownRepository.deleteCountdown(countdownId);
    };


};