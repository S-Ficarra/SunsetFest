import { Program } from "../../src/domain/models/program/program.model";
import { MockPerformanceRepository } from "./performance/mock.performance.repository";
import { MockProgramRepository } from "./mock.program.repository";
import { MockBandRepository } from "../band/mock.band.repository";
import { MockStageRepository } from "../facility/mockRepositories/mock.stage.repository";
import { MockTimeFrameRepository } from "./performance/mock.timeFrame.repository";
import { MockSocialsRepository } from "../band/mock.socials.repository";
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
    let socialRepository: MockSocialsRepository;
    let programService: ProgramService;
    let roleService: RoleService;
    let userRepository: MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository();
        roleService = new RoleService();
        socialRepository = new MockSocialsRepository();
        bandRepository = new MockBandRepository(socialRepository, userRepository);
        stageRepository = new MockStageRepository();
        timeFrameRepository = new MockTimeFrameRepository();
        socialRepository.setFakeIdToTest();
        bandRepository.setFakeIdToTest();
        stageRepository.setFakeIdToTest();
        timeFrameRepository.setFakeIdToTest();
        userRepository.setFakeIdToTest();
        performanceRepository = new MockPerformanceRepository(userRepository, bandRepository, timeFrameRepository, stageRepository);
        programRepository = new MockProgramRepository(performanceRepository);
        programService = new ProgramService(programRepository, roleService);
        performanceRepository.setFakeIdToTest();
        programRepository.setFakeIdToTest();

    });


    //getAllPrograms
    it('should return all programs', () => {
        const programs = programService.getAllPrograms();
        expect(programs).toHaveLength(2);      
        expect(programs[0].getId()).toBe(1);
        expect(programs[1].getId()).toBe(2);
    });


    //getProgramById
    it('should return the program with id 1', () => {
        const program = programService.getProgramById(1);
        expect(program.getId()).toBe(1);
    });


    //CreateProgram by an admin or editor
    it('should create a program', () => {
        const program = new Program([]);
        programService.createProgram(userRepository.users[1], program);
        const programs = programService.getAllPrograms();
        expect(programs).toHaveLength(3);
        expect(programs[2]).toBe(program);
    });


    //createProgram by an author
    it('should return unauthorized', () => {
        const program = new Program([]);
        const createProgramCall = () => programService.createProgram(userRepository.users[0], program);
        expect(createProgramCall).toThrow(Error);
    });


    //editProgram by an admin or editor
    it('should edit a program', () => {
        const program = new Program([]);
        program.setId(1);
        programService.editProgram(userRepository.users[1], program);
        const editedProgram = programService.getProgramById(1);
        expect(editedProgram).toBe(program);
    });


    //editProgram by an author
    it('should return unauthorized', () => {
        const program = new Program([]);
        const editProgramCall = () => programService.editProgram(userRepository.users[0], program);
        expect(editProgramCall).toThrow(Error);
    });


    //deleteProgram by an admin or editor
    it('should delete a program', () => {
        programService.deleteProgram(userRepository.users[1], 1);
        const programs = programService.getAllPrograms();
        expect(programs).toHaveLength(1);
        expect(programs[0].getId()).toBe(2);
    });


    //deleteProgram by an author
    it('should return unauthorized', () => {
        const deleteProgramCall = () => programService.deleteProgram(userRepository.users[0], 1);
        expect(deleteProgramCall).toThrow(Error);
    });


    //addPerformanceToProgram by an editor or administrator
    it('should add a performance to a program', () => {      
        const performance = performanceRepository.performances[0];
        programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        const program = programService.getProgramById(1);
        const performances = program.getPerformances();        
        expect(performances).toHaveLength(1);
        expect(performances[0]).toEqual(performance)
    });

    //addPerformanceToProgram by an author
    it('should return unauthorized', () => {
        const performance = performanceRepository.performances[0];
        const addPerfCall = () => programService.addPerformanceToProgram(userRepository.users[0], 1, performance);        
        expect(addPerfCall).toThrow(Error);
    });

    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to this performance already in the program', () => {    
        const performance = performanceRepository.performances[0];
        programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        const checkConflictCall = () => programService.addPerformanceToProgram(userRepository.users[1], 1, performance);        
        expect(checkConflictCall).toThrow(new Error ('This performance is already in the program'));
    });

    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to the band already playing', () => {  
        const performance1 = performanceRepository.performances[0];
        const performance2 = new Performance (bandRepository.bands[0], 2, timeFrameRepository.timeFrameArray[0], stageRepository.stages[0])
        programService.addPerformanceToProgram(userRepository.users[1], 1, performance1);
        const checkConflictCall = () => programService.addPerformanceToProgram(userRepository.users[1], 1, performance2);        
        expect(checkConflictCall).toThrow(new Error ('This band is planned to perform more than once'));
    });

    //addPerformanceToProgram by an editor or administrator with a conflict
    it('should return an error due to another band already planned at this stage, day and timeFrame', () => {  
        const performance1 = performanceRepository.performances[0];
        const performance2 = new Performance (bandRepository.bands[1], 1, timeFrameRepository.timeFrameArray[0], stageRepository.stages[0])
        programService.addPerformanceToProgram(userRepository.users[1], 1, performance1);
        const checkConflictCall = () => programService.addPerformanceToProgram(userRepository.users[1], 1, performance2);        
        expect(checkConflictCall).toThrow(new Error ('Another band is already planned at this stage, time & day'));
    });

    //deletePerformanceFromProgram by an admin or editor
    it('should delete a performance from a program', () => {
        const performance = performanceRepository.performances[0];
        programService.addPerformanceToProgram(userRepository.users[1], 1, performance);
        programService.deletePerformanceFromProgram(userRepository.users[1], 1, performance.getId());
        const program = programService.getProgramById(1);
        const performances = program.getPerformances();
        expect(performances).toHaveLength(0);
    });

    //deletePerformanceFromProgram by an author
    it('should return unauthorized', () => {
        const delPerfCall = () => programService.deletePerformanceFromProgram(userRepository.users[0], 1, 1);        
        expect(delPerfCall).toThrow(Error);
    });

});
