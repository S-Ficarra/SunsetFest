import { Program } from "src/domain/models/program/program.model";
import { ProgramRepository } from "src/domain/repositories/program/program.repository";
import { AdministratorService } from "../user/administrator.service";
import { EditorService } from "../user/editor.service";
import { Performance } from "src/domain/models/program/performance/performance.model";

export class ProgramService {

    constructor(
        private programRepository: ProgramRepository,
        private adminService: AdministratorService,
        private editorService: EditorService,
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

    private hasConflict(performanceA: Performance, performanceB: Performance): any {
        const sameDayStageTime = performanceA.getDay() == performanceB.getDay() && performanceA.getStage() == performanceB.getStage() && performanceA.getTimeFrame() == performanceB.getTimeFrame();
        const sameBand = performanceA.getBand() == performanceB.getBand();        
        if (sameBand && sameDayStageTime) {
            throw new Error('This performance is already in the program');
        } else if (sameBand) {
            throw new Error ("This band is planned to perform more than once");
        } else if (sameDayStageTime) {
            throw new Error('Another band is already planned at this stage, time & day');
        } else {
            return false;
        }
    };

    private checkConflict(performance: Performance, program: Program): boolean {
        const performances = program.getPerformances();
        for (let i = 0; i < performances.length; i++) {
            const performanceA = performances[i];
            const performanceB = performance;
                if (this.hasConflict(performanceA, performanceB)) {
                    return true
                };
            };
        return false;
    };
    
    addPerformanceToProgram(requestingUserId: number, programId: number, performance: Performance): any {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            let program = this.programRepository.getProgramById(programId);
            const isConflict = this.checkConflict(performance, program);
            if (!isConflict) {
                this.programRepository.addPerformanceToProgram(programId, performance);
            }
            return isConflict;
        } else {
            throw new Error ('Unauthorized');
        };
    }; 

    deletePerformanceFromProgram(requestingUserId: number, programId: number, performanceId: number): void {
        if(this.editorService.isEditor(requestingUserId) || this.adminService.isAdmin(requestingUserId)){
            this.programRepository.deletePerformanceFromProgram(programId, performanceId);
        } else {
            throw new Error ('Unauthorized');
        };
    };    

};