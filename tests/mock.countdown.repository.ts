import { Countdown } from "../src/domain/models/countdown.model";
import { CountdownRepository } from "../src/domain/repositories/countdown.repository";

export class MockCountdownRepository implements CountdownRepository {

    private countdowns: Countdown[] = [];

    constructor() {
        this.countdowns.push(
            new Countdown(new Date("2024-06-01T00:00:00"), new Date("2024-06-10T00:00:00")),
            new Countdown(new Date("2024-07-01T00:00:00"), new Date("2024-07-15T00:00:00"))
        );
    };

    setFakeIdToTest(): void {
        this.countdowns[0].setId(1)
        this.countdowns[1].setId(2)
    };

    getAllCountdowns(): Countdown[] {
        return this.countdowns;
    };

    getCountdownById(countdownId: number): Countdown | undefined {
        return this.countdowns.find(countdown => countdown.getId() === countdownId);
    };

    createCountdown(countdown: Countdown): void | Countdown {
        countdown.setId(this.countdowns.length + 1);
        this.countdowns.push(countdown);
    };

    editCountdown(countdown: Countdown): void | Countdown {
        const index = this.countdowns.findIndex(c => c.getId() === countdown.getId());
        if (index !== -1) {
            this.countdowns[index] = countdown;
        };
    };

    deleteCountdown(countdownId: number): void {
        const index = this.countdowns.findIndex(countdown => countdown.getId() === countdownId);
        if (index !== -1) {
            this.countdowns.splice(index, 1);
        };
    };
};
