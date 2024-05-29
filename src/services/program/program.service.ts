import { Program } from "src/domain/models/program/program.model";
import { ProgramRepository } from "src/domain/repositories/program/program.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";

export class ProgramService {

    constructor(
        private programRepository: ProgramRepository,
        private adminService: AdministratorService,
        private editorService: EditorService
    ){};

    getAllPrograms(): Program[] {
        return this.programRepository.getAllPrograms();
    };

    getProgramById(programId: number): Program {
        return this.programRepository.getProgramById(programId);
    };

    createProgram(requestingUserId: number, program: Program): void | Program {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.createProgram(program);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };

    editProgram(requestingUserId: number, program: Program): void | Program {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.editProgram(program);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };

    deleteProgram(requestingUserId: number, programId: number): void {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.deleteProgram(programId);
        } else {
            throw new Error ('Unauthorized');
        };
    };

    addPerformanceToProgram(requestingUserId: number, performanceId: number): void {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.addPerformanceToProgram(performanceId); 
        } else {
            throw new Error ('Unauthorized');
        };
    };

    deletePerformanceFromProgram(requestingUserId: number, performanceId: number): void {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.deletePerformanceFromProgram(performanceId);
        } else {
            throw new Error ('Unauthorized');
        };
    };
    

};