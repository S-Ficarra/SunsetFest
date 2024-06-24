import { Performance } from "src/domain/models/program/performance/performance.model";
import { Program } from "../../models/program/program.model"; 


export interface ProgramRepository {

    getProgramByYear(programYear: number): Promise <Program>;
    addPerformanceToProgram(program: Program, performance: Performance): Promise <void>;
    deletePerformanceFromProgram(programId: number, performanceId: number): Promise <void>;
    findPerformanceInProgram(programYear: number, performanceId : number): Promise <Performance>;

};
