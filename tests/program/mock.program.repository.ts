import { Performance } from "src/domain/models/program/performance/performance.model";
import { Program } from "../../src/domain/models/program/program.model";
import { ProgramRepository } from "../../src/domain/repositories/program/program.repository";
import { MockPerformanceRepository } from "./performance/mock.performance.repository";

export class MockProgramRepository implements ProgramRepository {

    constructor(
        private performanceRepository: MockPerformanceRepository,
    ){}

    public programList : Program [] = [ 
        new Program ([]),
        new Program ([])
    ];

    setFakeIdToTest(): void {
        this.programList[0].setId(1)
        this.programList[1].setId(2)
    };
    
    async getAllPrograms(): Promise<Program[]> {
        return this.programList;
    };

    async getProgramByYear(programId: number): Promise<Program> {
        return this.programList[programId -1 ];
    };

    findPerformanceInProgram(programYear: number, performanceId: number): Promise<Performance> {
        throw new Error("Method not implemented.");
    };

    async createProgram(id: number): Promise<Program> {
        const prog = new Program([])
        prog.setId(id);
        this.programList.push(prog);
        return prog;
    };

    async addPerformanceToProgram(program: Program, performance: Performance): Promise<void> {
        const performanceToAdd = await this.performanceRepository.getPerformanceById(performance.getId())
        const program1 = await this.getProgramByYear(1);
        program1.addPerformance(performanceToAdd);
    };

    async deletePerformanceFromProgram(performanceId: number): Promise<void> {
        const program1 = await this.getProgramByYear(1);
        for (const index in program1.getPerformances()) {
            const performance = program1.getPerformances()[index];
            if (performance.getId() === performanceId) {
                program1.getPerformances().splice(Number(index), 1);
                return;
            };
        };
        throw new Error(`Performance with ID ${performanceId} not found in program.`);
    };

};