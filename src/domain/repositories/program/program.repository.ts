import { Performance } from "src/domain/models/program/performance/performance.model";
import { Program } from "../../models/program/program.model"; 

export interface ProgramRepository {

    getAllPrograms(): Promise <Program[]>;
    getProgramById(programId: number): Promise <Program | undefined>;
    createProgram(id: number): Promise <Program>;
    addPerformanceToProgram(programId: number, performance: Performance): Promise <void>;
    deletePerformanceFromProgram(programId: number, performanceId: number): Promise <void>;
    
};
