import { Program } from "../../models/program/program.model"; 

export interface ProgramRepository {

    getAllPrograms(): Program[];
    getProgramByDay(day: string): Program | undefined;
    createProgram(program: Program): void;
    editProgram(program: Program): void;
    //deleteProgram(id: number): void;

};
