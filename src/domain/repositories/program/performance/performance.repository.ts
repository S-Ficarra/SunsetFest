import { Performance } from "../../../models/program/performance/performance.model"

export interface PerformanceRepository {

    getAllPerformances(): Performance[];
    getPerformanceById(id: number): Performance | undefined;
    createPerformance(performance: Performance): void;
    editPerformance(performance: Performance): void;
    deletePerformance(id: number): void;

};