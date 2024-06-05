import { Performance } from "src/domain/models/program/performance/performance.model";
import { Program } from "../../models/program/program.model"; 

export interface ProgramRepository {

    getAllPrograms(): Promise <Program[]>;
    getProgramById(programId: number): Promise <Program | undefined>;
    createProgram(program: Program): Promise <Program>;
    editProgram(program: Program): Promise <Program>;
    deleteProgram(programId: number): Promise <void>;
    addPerformanceToProgram(programId: number, performance: Performance): Promise <void>;
    deletePerformanceFromProgram(programId: number, performanceId: number): Promise <void>;
    
};
