import { Inject } from "@nestjs/common";
import { Performance } from "../../../domain/models/program/performance/performance.model";
import { PerformanceRepository } from "../../../domain/repositories/program/performance/performance.repository";

export class PerformanceService {

    constructor(@Inject('PerformanceRepository') private performanceRepository: PerformanceRepository){};

    async getAllPerformances(): Promise<Performance[]> {
        return await this.performanceRepository.getAllPerformances();
    };

    async getPerformanceById(performanceId: number): Promise<Performance> {
        const performance =  await this.performanceRepository.getPerformanceById(performanceId);
        if (performance) {
            return performance;
        };
        throw new Error (`Performance ${performanceId} do not exist`);
    };

    async createPerformance(performance: Performance): Promise<Performance> {
        await this.performanceRepository.createPerformance(performance);
        return performance
    };

    async editPerformance(performance: Performance): Promise<Performance> {
        await this.performanceRepository.editPerformance(performance);
        return performance
    };

    async deletePerformance(performanceId: number): Promise<void> {
        await this.performanceRepository.deletePerformance(performanceId);
    };

};