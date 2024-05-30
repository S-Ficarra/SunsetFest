import { Countdown } from "src/domain/models/countdown.model";
import { CountdownRepository } from "src/domain/repositories/countdown.repository";

export class CountdownService{


    constructor(private countdownRepository: CountdownRepository){};


    getAllCountdowns(): Countdown[] {
        return this.countdownRepository.getAllCountdowns();
    };

    getCountdownById(countdownId: number): Countdown {
        return this.countdownRepository.getCountdownById(countdownId);
    };

    createCountdown(countdown: Countdown): void | Countdown {
        this.countdownRepository.createCountdown(countdown);
    };

    editCountdown(countdown: Countdown): void | Countdown {
        this.countdownRepository.editCountdown(countdown);
    };

    deleteCountdown(countdownId: number): void {
        this.countdownRepository.deleteCountdown(countdownId);
    };


};