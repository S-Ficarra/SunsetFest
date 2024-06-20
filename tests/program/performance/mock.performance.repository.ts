import { Performance } from "../../../src/domain/models/program/performance/performance.model";
import { PerformanceRepository } from "../../../src/domain/repositories/program/performance/performance.repository";
import { MockBandRepository } from "../../band/mock.band.repository";
import { MockTimeFrameRepository } from "./mock.timeFrame.repository";
import { MockStageRepository } from "../../facility/mockRepositories/mock.stage.repository";
import { MockUserRepository } from "../../user/mock.user.repository";

export class MockPerformanceRepository implements PerformanceRepository{

    public userRepository: MockUserRepository;
    public bandRepository : MockBandRepository;
    public timeFrameRepository : MockTimeFrameRepository;
    public stageRepository: MockStageRepository;
    public performances: Performance [] = [];

    constructor(
        userRepository: MockUserRepository,
        bandRepository : MockBandRepository,
        timeFrameRepository : MockTimeFrameRepository,
        stageRepository: MockStageRepository,) {
            this.userRepository = userRepository;
            this.bandRepository = bandRepository;
            this.timeFrameRepository = timeFrameRepository;
            this.stageRepository = stageRepository;
            userRepository.setFakeIdToTest();
            bandRepository.setFakeIdToTestBand();
            timeFrameRepository.setFakeIdToTest();
            stageRepository.setFakeIdToTest();
            this.initializePerformances();
        };


    private initializePerformances(): void {
        this.performances.push(
            new Performance (this.bandRepository.bands[0], this.timeFrameRepository.timeFrameArray[0], this.stageRepository.stages[0]),
            new Performance (this.bandRepository.bands[1], this.timeFrameRepository.timeFrameArray[1], this.stageRepository.stages[1])
        );
        };
    
    setFakeIdToTest(): void {
        this.performances[0].setId(1)
        this.performances[1].setId(2)
    };


    async getAllPerformances(): Promise<Performance[]> {
        return this.performances;
    };

    async getPerformanceById(performanceId: number): Promise<Performance> {
        return this.performances[performanceId -1 ];
    };

    async createPerformance(performance: Performance): Promise<Performance> {
        this.performances.push(performance);
        const index = this.performances.length;
        performance.setId(index);
        return performance
    };

    async editPerformance(performance: Performance): Promise<Performance> {
        let performanceId = performance.getId();
        this.performances[performanceId - 1] = performance;
        return performance
    };

    async deletePerformance(performanceId: number): Promise<void> {
        this.performances = this.performances.filter(performance => performance.getId() !== performanceId);
    };
}