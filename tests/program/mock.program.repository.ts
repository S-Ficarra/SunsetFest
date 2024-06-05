import { Program } from "../../src/domain/models/program/program.model";
import { ProgramRepository } from "../../src/domain/repositories/program/program.repository";
import { MockPerformanceRepository } from "./performance/mock.performance.repository";

export class MockProgramRepository implements ProgramRepository {

    constructor(
        private performanceRepository: MockPerformanceRepository,
    ){};

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

    async getProgramById(programId: number): Promise<Program> {
        return this.programList[programId -1 ];
    };

    async createProgram(program: Program): Promise<Program> {
        this.programList.push(program);
        const index = this.programList.length;
        program.setId(index);
        return program
    };

    async editProgram(program: Program): Promise<Program> {
        let programId = program.getId();
        this.programList[programId - 1] = program;
        return program
    };

    async deleteProgram(programId: number): Promise<void> {
        this.programList = this.programList.filter(program => program.getId() !== programId);
    };


    async addPerformanceToProgram(performanceId: number): Promise<void> {
        const performanceToAdd = await this.performanceRepository.getPerformanceById(performanceId);
        const program1 = await this.getProgramById(1);
        program1.addPerformance(performanceToAdd);
    };

    async deletePerformanceFromProgram(performanceId: number): Promise<void> {
        const program1 = await this.getProgramById(1);
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