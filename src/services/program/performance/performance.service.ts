import { Performance } from "../../../domain/models/program/performance/performance.model";
import { PerformanceRepository } from "../../../domain/repositories/program/performance/performance.repository";

export class PerformanceService {

    constructor(
        private performanceRepository: PerformanceRepository,
        ){};

    async getAllPerformances(): Promise<Performance[]> {
        return this.performanceRepository.getAllPerformances();
    };

    async getPerformanceById(performanceId: number): Promise<Performance> {
        return this.performanceRepository.getPerformanceById(performanceId);
    };

    async createPerformance(performance: Performance): Promise<Performance> {
        this.performanceRepository.createPerformance(performance);
        return performance
    };

    async editPerformance(performance: Performance): Promise<Performance> {
        this.performanceRepository.editPerformance(performance);
        return performance
    };

    async deletePerformance(performanceId: number): Promise<void> {
        this.performanceRepository.deletePerformance(performanceId);
    }

};