import { Program } from "../../domain/models/program/program.model";
import { ProgramRepository } from "src/domain/repositories/program/program.repository";
import { RoleService } from "../user/role.service";
import { Performance } from "src/domain/models/program/performance/performance.model";
import { User } from "src/domain/models/user/user.model";
import { Inject } from "@nestjs/common";


export class ProgramService {

    constructor(
        @Inject('ProgramRepository') private programRepository: ProgramRepository,
        private roleService: RoleService,
    ){};

    async findPerformanceInProgram(programYear: number, performanceId : number): Promise <{}>{
        const perf = await this.programRepository.findPerformanceInProgram(programYear, performanceId);
        if (perf) {
            return perf
        };
        return null;
    };


    async getProgramByYear(programYear: number): Promise<Program> {
        const program = await this.programRepository.getProgramByYear(programYear);
        return program;
    };

    async addPerformanceToProgram(requestingUser: User, programYear: number, performance: Performance): Promise<Performance> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let program = await this.programRepository.getProgramByYear(programYear);
            if (!program) {
                program = new Program ([]);
                program.setId(programYear);
            };                            
            let isOk = this.noConflict(performance, program)
            if (isOk) {
                await this.programRepository.addPerformanceToProgram(program, performance);
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
        const hasSameDayStageTime = performanceA.getStage().getId() == performanceB.getStage().getId() && performanceA.getTimeFrame().getId() == performanceB.getTimeFrame().getId();        
        const hasSameBand = performanceA.getBand().getId() == performanceB.getBand().getId();        
        if (hasSameBand && hasSameDayStageTime) {
            throw new Error('This performance is already in the program');
        } else if (hasSameBand) {
            throw new Error ("This band is planned to perform more than once");
        } else if (hasSameDayStageTime) {
            throw new Error('Another band is already planned at this stage, time & day');
        } else {
            return false;
        }
    };

    async deletePerformanceFromProgram(requestingUser: User, programId: number, performanceId: number): Promise<void> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            await this.programRepository.deletePerformanceFromProgram(programId, performanceId);
        } else {
            throw new Error ('Unauthorized');
        };
    };    

};