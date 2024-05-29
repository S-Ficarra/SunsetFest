import { Performance } from "../../../domain/models/program/performance/performance.model";
import { PerformanceRepository } from "../../../domain/repositories/program/performance/performance.repository";

export class PerformanceService {

    constructor(
        private performanceRepository: PerformanceRepository,
        ){};

    getAllPerformances(): Performance[] {
        return this.performanceRepository.getAllPerformances();
    };

    getPerformanceById(performanceId: number): Performance {
        return this.performanceRepository.getPerformanceById(performanceId);
    };

    createPerformance(performance: Performance): Performance {
        this.performanceRepository.createPerformance(performance);
        return performance
    };

    editPerformance(performance: Performance): Performance {
        this.performanceRepository.editPerformance(performance);
        return performance
    };

    deletePerformance(performanceId: number): void {
        this.performanceRepository.deletePerformance(performanceId);
    }

};