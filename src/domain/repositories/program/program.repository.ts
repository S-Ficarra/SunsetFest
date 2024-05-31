import { Performance } from "src/domain/models/program/performance/performance.model";
import { Program } from "../../models/program/program.model"; 

export interface ProgramRepository {

    getAllPrograms(): Program[];
    getProgramById(programId: number): Program | undefined;
    createProgram(program: Program): void | Program;
    editProgram(program: Program): void | Program;
    deleteProgram(programId: number): void;
    addPerformanceToProgram(programId: number, performance: Performance): void;
    deletePerformanceFromProgram(programId: number, performanceId: number): void;
};
