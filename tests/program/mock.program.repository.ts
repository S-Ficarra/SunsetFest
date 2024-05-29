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
    
    getAllPrograms(): Program[] {
        return this.programList;
    };

    getProgramById(programId: number): Program {
        return this.programList[programId -1 ];
    };

    createProgram(program: Program): void | Program {
        this.programList.push(program);
        const index = this.programList.length;
        program.setId(index);
        return program
    };

    editProgram(program: Program): void | Program {
        let programId = program.getId();
        this.programList[programId - 1] = program;
        return program
    };

    deleteProgram(programId: number): void {
        this.programList = this.programList.filter(program => program.getId() !== programId);
    };

    addPerformanceToProgram(performanceId: number): void {
        const performanceToAdd = this.performanceRepository.getPerformanceById(performanceId);
        const program1 = this.getProgramById(1)
        program1.addPerformance(performanceToAdd);
    };

    deletePerformanceFromProgram(performanceId: number): void {
        const program1 = this.getProgramById(1);
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