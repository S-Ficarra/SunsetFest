import { Countdown } from "../src/domain/models/countdown.model";
import { CountdownRepository } from "../src/domain/repositories/countdown.repository";

export class MockCountdownRepository implements CountdownRepository {

    private countdowns: Countdown[] = [];

    constructor() {
        this.countdowns.push(
            new Countdown("2024", new Date("2024-06-10T00:00:00")),
            new Countdown("2025", new Date("2024-07-15T00:00:00"))
        );
    };

    setFakeIdToTest(): void {
        this.countdowns[0].setId(1)
        this.countdowns[1].setId(2)
    };

    async getAllCountdowns(): Promise<Countdown[]> {
        return this.countdowns;
    };

    async getCountdownById(countdownId: number): Promise<Countdown> {
        return this.countdowns.find(countdown => countdown.getId() === countdownId);
    };

    async createCountdown(countdown: Countdown): Promise<Countdown> {
        countdown.setId(this.countdowns.length + 1);
        this.countdowns.push(countdown);
        return countdown;
    };

    async editCountdown(countdown: Countdown): Promise<Countdown> {
        const index = this.countdowns.findIndex(c => c.getId() === countdown.getId());
        if (index !== -1) {
            this.countdowns[index] = countdown;
        };
        return countdown;
    };

    async deleteCountdown(countdownId: number): Promise<void> {
        const index = this.countdowns.findIndex(countdown => countdown.getId() === countdownId);
        if (index !== -1) {
            this.countdowns.splice(index, 1);
        };
    };
};
