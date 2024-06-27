import { Inject } from "@nestjs/common";
import { Countdown } from "src/domain/models/countdown.model";
import { CountdownRepository } from "src/domain/repositories/countdown.repository";

export class CountdownService{

    constructor( @Inject('CountdownRepository') private countdownRepository: CountdownRepository){};

    async getAllCountdowns(): Promise<Countdown[]> {
        return await this.countdownRepository.getAllCountdowns();
    };

    async getCountdownById(countdownId: number): Promise<Countdown> {
        const countdown = await this.countdownRepository.getCountdownById(countdownId);
        if (countdown) {
            return countdown;
        };
        throw new Error (`Countdown ${countdownId} do not exist`);
    };

    async createCountdown(countdown: Countdown): Promise<Countdown> {
        const countdownCreated = await this.countdownRepository.createCountdown(countdown);
        return countdownCreated;
    };

    async editCountdown(countdown: Countdown): Promise<Countdown> {
        await this.countdownRepository.editCountdown(countdown);
        return countdown;
    };

    async deleteCountdown(countdownId: number): Promise<void> {
        await this.countdownRepository.deleteCountdown(countdownId);
    };


};