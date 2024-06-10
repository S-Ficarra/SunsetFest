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

    async getAllPrograms(): Promise<Program[]> {
        return this.programRepository.getAllPrograms();
    };

    async getProgramById(programId: number): Promise<Program> {
        return this.programRepository.getProgramById(programId);
    };

    async createProgram(requestingUser: User, id: number): Promise<Program> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            const program = await this.programRepository.createProgram(id);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };
/*
    async editProgram(requestingUser: User, program: Program): Promise<Program> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            await this.programRepository.editProgram(program);
            return program;
        } else {
            throw new Error ('Unauthorized');
        };
    };

    async deleteProgram(requestingUser: User, programId: number): Promise<void> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            await this.programRepository.deleteProgram(programId);
        } else {
            throw new Error ('Unauthorized');
        };
    };
*/
    async addPerformanceToProgram(requestingUser: User, programId: number, performance: Performance): Promise<Performance> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let program = await this.programRepository.getProgramById(programId);
            let isOk = this.noConflict(performance, program)
            if (isOk) {
                await this.programRepository.addPerformanceToProgram(programId, performance);
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

    async deletePerformanceFromProgram(requestingUser: User, programId: number, performanceId: number): Promise<void> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            this.programRepository.deletePerformanceFromProgram(programId, performanceId);
        } else {
            throw new Error ('Unauthorized');
        };
    };    

};