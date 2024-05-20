import { Program } from "../../models/program/program.model";
import { AuthorRepository } from "./author.repository";

export interface EditorRepository extends AuthorRepository{

    deleteFaq(faqId: number): void;

    deleteNews(newsId: number): void;

    deleteInformation(informationId: number): void;

    deleteBand(bandId: number): void;

    publish(publicationId: number): void;
    
    editProgram(program: Program): void;
    
};
