import { Program } from "../../models/program/program.model";

export interface EditorRepository {

    publish(publicationId: number): void;
    
    editProgram(program: Program): void;
    
};
