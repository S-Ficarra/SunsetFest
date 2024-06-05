import { Countdown } from "../src/domain/models/countdown.model";
import { CountdownService } from "../src/services/countdown.service";
import { MockCountdownRepository } from "./mock.countdown.repository";

describe('CountdownService', () => {
    let countdownService: CountdownService;
    let countdownRepository: MockCountdownRepository;

    beforeEach(() => {
        countdownRepository = new MockCountdownRepository();
        countdownService = new CountdownService(countdownRepository);
        countdownRepository.setFakeIdToTest();
    });

    // getCountdownById
    it("Should return a countdown by its id", async () => {
        const foundCountdown = await countdownService.getCountdownById(1);
        expect(foundCountdown).toBeDefined();
        expect(foundCountdown!.getId()).toBe(1);
    });

    // getAllCountdowns
    it('Should return all countdowns', async () => {
        const countdowns = await countdownService.getAllCountdowns();
        expect(countdowns).toHaveLength(2);
    });

    // createCountdown
    it('Should create a new countdown', async () => {
        const newCountdown = new Countdown("2026", new Date("2024-09-01T00:00:00"), new Date("2024-09-10T00:00:00"));
        await countdownService.createCountdown(newCountdown);
        const countdowns = await countdownService.getAllCountdowns();
        expect(countdowns).toHaveLength(3);
    });

    // editCountdown
    it('Should edit an existing countdown', async () => {
        const countdownId = 1;
        const updatedCountdown = new Countdown("2026", new Date("2024-06-01T00:00:00"), new Date("2024-06-15T00:00:00"));
        updatedCountdown.setId(countdownId);
        await countdownService.editCountdown(updatedCountdown);
        const countdown = await countdownService.getCountdownById(countdownId);
        expect(countdown).toBeDefined();
        expect(countdown!.getEndingDateAndTime()).toEqual(new Date("2024-06-15T00:00:00"));
    });

    // deleteCountdown
    it('Should delete an existing countdown', async () => {
        const countdownId = 1;
        await countdownService.deleteCountdown(countdownId);
        const countdowns = await countdownService.getAllCountdowns();
        expect(countdowns).toHaveLength(1);
        expect(countdowns.some(countdown => countdown.getId() === countdownId)).toBeFalsy();
    });
});
