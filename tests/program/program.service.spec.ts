import { Program } from "../../src/domain/models/program/program.model";
import { MockPerformanceRepository } from "./performance/mock.performance.repository";
import { MockProgramRepository } from "./mock.program.repository";
import { MockBandRepository } from "../band/mock.band.repository";
import { MockStageRepository } from "../facility/mockRepositories/mock.stage.repository";
import { MockTimeFrameRepository } from "./performance/mock.timeFrame.repository";
import { MockSocialsRepository } from "../band/mock.socials.repository";
import { ProgramService } from "../../src/services/program/program.service";
import { AdministratorService } from "../../src/services/user/administrator.service";
import { EditorService } from "../../src/services/user/editor.service";
import { MockUserRepository } from "../user/mock.user.repository";

describe('MockProgramRepository', () => {
    let programRepository: MockProgramRepository;
    let performanceRepository: MockPerformanceRepository;
    let bandRepository: MockBandRepository;
    let stageRepository: MockStageRepository;
    let timeFrameRepository: MockTimeFrameRepository;
    let socialRepository: MockSocialsRepository;
    let programService: ProgramService;
    let adminService: AdministratorService;
    let editorService: EditorService;
    let userRepository: MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository();
        adminService = new AdministratorService(userRepository);
        editorService = new EditorService(userRepository);
        socialRepository = new MockSocialsRepository();
        bandRepository = new MockBandRepository(socialRepository);
        stageRepository = new MockStageRepository();
        timeFrameRepository = new MockTimeFrameRepository();
        socialRepository.setFakeIdToTest();
        bandRepository.setFakeIdToTest();
        stageRepository.setFakeIdToTest();
        timeFrameRepository.setFakeIdToTest();
        userRepository.setFakeIdToTest();
        performanceRepository = new MockPerformanceRepository(bandRepository, timeFrameRepository, stageRepository);
        programRepository = new MockProgramRepository(performanceRepository);
        programService = new ProgramService(programRepository, adminService, editorService, );
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
        programService.createProgram(2, program);
        const programs = programService.getAllPrograms();
        expect(programs).toHaveLength(3);
        expect(programs[2]).toBe(program);
    });


    //createProgram by an author
    it('should return unauthorized', () => {
        const program = new Program([]);
        const createProgramCall = () => programService.createProgram(1, program);
        expect(createProgramCall).toThrow(Error);
    });


    //editProgram by an admin or editor
    it('should edit a program', () => {
        const program = new Program([]);
        program.setId(1);
        programService.editProgram(2, program);
        const editedProgram = programService.getProgramById(1);
        expect(editedProgram).toBe(program);
    });


    //editProgram by an author
    it('should return unauthorized', () => {
        const program = new Program([]);
        const editProgramCall = () => programService.editProgram(1, program);
        expect(editProgramCall).toThrow(Error);
    });


    //deleteProgram by an admin or editor
    it('should delete a program', () => {
        programService.deleteProgram(3, 1);
        const programs = programService.getAllPrograms();
        expect(programs).toHaveLength(1);
        expect(programs[0].getId()).toBe(2);
    });


    //deleteProgram by an author
    it('should return unauthorized', () => {
        const deleteProgramCall = () => programService.deleteProgram(1, 1);
        expect(deleteProgramCall).toThrow(Error);
    });


    //addPerformanceToProgram by an editor or administrator
    it('should add a performance to a program', () => {      
        const performanceId = 1;
        programService.addPerformanceToProgram(2, performanceId);
        const program = programService.getProgramById(1);
        const performances = program.getPerformances();
        expect(performances).toHaveLength(1);
        expect(performances[0].getId()).toBe(performanceId);
    });

    //addPerformanceToProgram by an author
    it('should return unauthorized', () => {
        const addPerfCall = () => programService.addPerformanceToProgram(1, 1);        
        expect(addPerfCall).toThrow(Error);
    });

    //deletePerformanceFromProgram by an admin or editor
    it('should delete a performance from a program', () => {
        const performanceId = 1;
        programService.addPerformanceToProgram(3, performanceId);
        programService.deletePerformanceFromProgram(3, performanceId);
        const program = programService.getProgramById(1);
        const performances = program.getPerformances();
        expect(performances).toHaveLength(0);
    });

    //deletePerformanceFromProgram by an author
    it('should return unauthorized', () => {
        const delPerfCall = () => programService.deletePerformanceFromProgram(1, 1);        
        expect(delPerfCall).toThrow(Error);
    });

});
