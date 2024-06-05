import { Performance } from "../../../models/program/performance/performance.model"

export interface PerformanceRepository {

    getAllPerformances(): Promise <Performance[]>;
    getPerformanceById(performanceId: number): Promise <Performance | undefined>;
    createPerformance(performance: Performance): Promise <Performance>;
    editPerformance(performance: Performance): Promise <Performance>;
    deletePerformance(performanceId: number): Promise <void>;

};