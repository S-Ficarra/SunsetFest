import { Program } from "src/domain/models/program/program.model";
import { ProgramRepository } from "src/domain/repositories/program/program.repository";
import { RoleService } from "../user/role.service";
import { Performance } from "src/domain/models/program/performance/performance.model";
import { User } from "src/domain/models/user/user.model";

export class ProgramService {

    constructor(
        private programRepository: ProgramRepository,
        private roleService: RoleService,
    ){};

    getAllPrograms(): Program[] {
        return this.programRepository.getAllPrograms();
    };

    getProgramById(programId: number): Program {
        return this.programRepository.getProgramById(programId);
    };

    createProgram(requestingUser: User, program: Program): void | Program {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.programRepository.createProgram(program);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };

    editProgram(requestingUser: User, program: Program): void | Program {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.programRepository.editProgram(program);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };

    deleteProgram(requestingUser: User, programId: number): void {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.programRepository.deleteProgram(programId);
        } else {
            throw new Error ('Unauthorized');
        };
    };

    addPerformanceToProgram(requestingUser: User, programId: number, performance: Performance): any {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let program = this.programRepository.getProgramById(programId);
            let isOk = this.noConflict(performance, program)
            if (isOk) {
                this.programRepository.addPerformanceToProgram(programId, performance);
                return performance;
            };
        } else {
            throw new Error ('Unauthorized');
        };
    }; 

    private noConflict(performance: Performance, program: Program): boolean {
        const performances = program.getPerformances();
        for (let i = 0; i < performances.length; i++) {
            const performanceA = performances[i];
            const performanceB = performance;
                if (this.hasConflict(performanceA, performanceB)) {
                    return false
                };
            };
        return true;
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

    deletePerformanceFromProgram(requestingUser: User, programId: number, performanceId: number): void {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.programRepository.deletePerformanceFromProgram(programId, performanceId);
        } else {
            throw new Error ('Unauthorized');
        };
    };    

};