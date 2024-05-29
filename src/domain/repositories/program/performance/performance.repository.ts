import { Performance } from "../../../models/program/performance/performance.model"

export interface PerformanceRepository {

    getAllPerformances(): Performance[];
    getPerformanceById(performanceId: number): Performance | undefined;
    createPerformance(performance: Performance): Performance;
    editPerformance(performance: Performance): Performance;
    deletePerformance(performanceId: number): void;

};