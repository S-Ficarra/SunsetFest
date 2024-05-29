import { Program } from "../../models/program/program.model"; 

export interface ProgramRepository {

    getAllPrograms(): Program[];
    getProgramById(programId: number): Program | undefined;
    createProgram(program: Program): void | Program;
    editProgram(program: Program): void | Program;
    deleteProgram(programId: number): void;
    addPerformanceToProgram(performanceId: number): void;
    deletePerformanceFromProgram(performanceId: number): void;
};
