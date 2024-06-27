import { Program } from "../../src/domain/models/program/program.model";
import { MockPerformanceRepository } from "./performance/mock.performance.repository";
import { MockProgramRepository } from "./mock.program.repository";
import { MockBandRepository } from "../band/mock.band.repository";
import { MockStageRepository } from "../facility/mockRepositories/mock.stage.repository";
import { MockTimeFrameRepository } from "./performance/mock.timeFrame.repository";
import { ProgramService } from "../../src/services/program/program.service";
import { RoleService } from "../../src/services/user/role.service";
import { MockUserRepository } from "../user/mock.user.repository";
import { Performance } from "../../src/domain/models/program/performance/performance.model";

describe('MockProgramRepository', () => {
    let programRepository: MockProgramRepository;
    let performanceRepository: MockPerformanceRepository;
    let bandRepository: MockBandRepository;
    let stageRepository: MockStageRepository;
    let timeFrameRepository: MockTimeFrameRepository;
    let programService: ProgramService;
    let roleService: RoleService;
    let userRepository: MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository();
        roleService = new RoleService();
        bandRepository = new MockBandRepository(userRepository);
        stageRepository = new MockStageRepository();
        timeFrameRepository = new MockTimeFrameRepository();
        bandRepository.setFakeIdToTestSocials();
        bandRepository.setFakeIdToTestBand();
        stageRepository.setFakeIdToTest();
        timeFrameRepository.setFakeIdToTest();
        userRepository.setFakeIdToTest();
        performanceRepository = new MockPerformanceRepository(userRepository, bandRepository, timeFrameRepository, stageRepository);
        programRepository = new MockProgramRepository(performanceRepository);
        programService = new ProgramService(programRepository, roleService);
        performanceRepository.setFakeIdToTest();
        programRepository.setFakeIdToTest();

    });


    //getProgramByYear
    it('should return the program with id 1', async () => {
        const program = await programService.getProgramByYear(1);
        expect(program.getId()).toBe(1);
    });


    //addPerformanceToProgram by an editor or administrator
    it('should add a performance to a program', async () => {      
        const performance = performanceRepository.performances[0];
        await programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        const program = await programService.getProgramByYear(1);
        const performances = program.getPerformances();        
        expect(performances).toHaveLength(1);
        expect(performances[0]).toEqual(performance)
    });

    //addPerformanceToProgram by an author
    it('should return unauthorized', async () => {
        const performance = performanceRepository.performances[0];
        expect(programService.addPerformanceToProgram(userRepository.users[0], 1, performance)).rejects.toThrow('Unauthorized');
    });


    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to this performance already in the program', async () => {    
        const performance = performanceRepository.performances[0];
        await programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        const checkConflictCall = async () => await programService.addPerformanceToProgram(userRepository.users[1], 1, performance);        
        expect(checkConflictCall).rejects.toThrow(new Error ('This performance is already in the program'));
    });

    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to the band already playing', async () => {  
        const performance1 = performanceRepository.performances[0];
        const performance2 = new Performance (bandRepository.bands[0], timeFrameRepository.timeFrameArray[1], stageRepository.stages[0])
        await programService.addPerformanceToProgram(userRepository.users[1], 1, performance1);
        const checkConflictCall = async () => await programService.addPerformanceToProgram(userRepository.users[1], 1, performance2);        
        expect(checkConflictCall).rejects.toThrow(new Error ('This band is planned to perform more than once'));
    });

    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to another band already planned at this stage, day and timeFrame', async () => {  
        const performance1 = performanceRepository.performances[0];
        const performance2 = new Performance (bandRepository.bands[1], timeFrameRepository.timeFrameArray[0], stageRepository.stages[0])
        await programService.addPerformanceToProgram(userRepository.users[1], 1, performance1);
        const checkConflictCall = async () => await programService.addPerformanceToProgram(userRepository.users[1], 1, performance2);        
        expect(checkConflictCall).rejects.toThrow(new Error ('Another band is already planned at this stage, time & day'));
    });

    //deletePerformanceFromProgram by an admin or editor
    it('should delete a performance from a program', async () => {
        const performance = performanceRepository.performances[0];
        await programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        await programService.deletePerformanceFromProgram(userRepository.users[1], 1, performance.getId());
        const program = await programService.getProgramByYear(1);
        const performances = program.getPerformances();
        expect(performances).toHaveLength(0);
    });

    //deletePerformanceFromProgram by an author
    it('should return unauthorized', async () => {
        expect(programService.deletePerformanceFromProgram(userRepository.users[0], 1, 1)).rejects.toThrow(Error);
    });

});
