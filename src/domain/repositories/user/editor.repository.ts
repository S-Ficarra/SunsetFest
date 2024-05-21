import { Program } from "../../models/program/program.model";
import { AuthorRepository } from "./author.repository";

export interface EditorRepository extends AuthorRepository{

    publish(publicationId: number): void;
    
    editProgram(program: Program): void;
    
};
