import { Performance } from "../../../src/domain/models/program/performance/performance.model";
import { PerformanceRepository } from "../../../src/domain/repositories/program/performance/performance.repository";
import { MockBandRepository } from "../../band/mock.band.repository";
import { MockTimeFrameRepository } from "./mock.timeFrame.repository";
import { MockStageRepository } from "../../facility/mockRepositories/mock.stage.repository";

export class MockPerformanceRepository implements PerformanceRepository{


    constructor(
        private bandRepository : MockBandRepository,
        private timeFrameRepository : MockTimeFrameRepository,
        private stageRepository: MockStageRepository,
    ){};

    public performances: Performance[] = [
        new Performance (this.bandRepository.getBandById(1).getId(), 1, this.timeFrameRepository.getTimeFrameById(1).getId(), this.stageRepository.getStageById(1).getId()),
        new Performance (this.bandRepository.getBandById(2).getId(), 2, this.timeFrameRepository.getTimeFrameById(2).getId(), this.stageRepository.getStageById(2).getId())
    ];
    
    setFakeIdToTest(): void {
        this.performances[0].setId(1)
        this.performances[1].setId(2)
    };


    getAllPerformances(): Performance[] {
        return this.performances;
    };

    getPerformanceById(performanceId: number): Performance | undefined {
        return this.performances[performanceId -1 ];
    };

    createPerformance(performance: Performance): Performance {
        this.performances.push(performance);
        const index = this.performances.length;
        performance.setId(index);
        return performance
    };

    editPerformance(performance: Performance): Performance {
        let performanceId = performance.getId();
        this.performances[performanceId - 1] = performance;
        return performance
    };

    deletePerformance(performanceId: number): void {
        this.performances = this.performances.filter(performance => performance.getId() !== performanceId);
    };
}