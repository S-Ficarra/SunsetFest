import { Performance } from "../../../src/domain/models/program/performance/performance.model";
import { PerformanceService } from "../../../src/services/program/performance/performance.service";
import { MockPerformanceRepository } from "../performance/mock.performance.repository";
import { MockTimeFrameRepository } from "./mock.timeFrame.repository";
import { MockBandRepository } from "../../band/mock.band.repository";
import { MockStageRepository } from "../../facility/mockRepositories/mock.stage.repository";
import { MockUserRepository } from "../../user/mock.user.repository";


describe('PerformanceService', () => {
    let bandRepository : MockBandRepository;
    let stageRepository : MockStageRepository;
    let timeFrameRepository: MockTimeFrameRepository;
    let performanceService: PerformanceService;
    let performanceRepository: MockPerformanceRepository;
    let userRepository : MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository();
        bandRepository = new MockBandRepository( userRepository)
        stageRepository = new MockStageRepository();
        timeFrameRepository = new MockTimeFrameRepository();
        userRepository.setFakeIdToTest();
        bandRepository.setFakeIdToTestSocials();
        bandRepository.setFakeIdToTestBand();
        timeFrameRepository.setFakeIdToTest();
        stageRepository.setFakeIdToTest();
        performanceRepository= new MockPerformanceRepository(userRepository, bandRepository, timeFrameRepository, stageRepository);
        performanceService = new PerformanceService(performanceRepository);
        performanceRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
    });

    
    //getAllPerformance
    it('should return all performance', async () => {
        const performance = await performanceService.getAllPerformances();
        expect(performance).toHaveLength(2);
        expect(performance).toEqual(expect.arrayContaining([
            expect.objectContaining({_day: 'friday', _band: 
            expect.objectContaining({_id: 1}), _stage: 
            expect.objectContaining({_id: 1})}),
            expect.objectContaining({_day: 'saturday', _band: 
            expect.objectContaining({_id: 2}), _stage: 
            expect.objectContaining({_id: 2})})
        ]));
    });

    //getPerformanceById
    it("should return a performance by it's id", async () => {
        let foundPerformance1 = await performanceService.getPerformanceById(1);
        expect(foundPerformance1).toEqual(
            expect.objectContaining({_day: 'friday', _band: 
            expect.objectContaining({_id: 1}), _stage: 
            expect.objectContaining({_id: 1})}));
    });



    //createPerformance
    it('should return a performance just created', async () => {
        const performanceCreated = new Performance (bandRepository.bands[0], 'sunday', timeFrameRepository.timeFrameArray[0], stageRepository.stages[0]);
        performanceService.createPerformance(performanceCreated); 
        const foundPerformance3 = await performanceService.getPerformanceById(3)
        expect(foundPerformance3).toEqual(performanceCreated);
    });

    
    //editPerformance
    it('should return a performance edited', async () => {
        const performanceEdited = new Performance (bandRepository.bands[1], 'saturday', timeFrameRepository.timeFrameArray[0], stageRepository.stages[1]);
        performanceEdited.setId(1)
        performanceService.editPerformance(performanceEdited);  
        const foundPerformanceEdited = await performanceService.getPerformanceById(1)  
        expect(foundPerformanceEdited).toEqual(performanceEdited)
    });

    //deletePerformance
    it('should return the performance list without the one with id 1', async () => {
        await performanceService.deletePerformance(1)
        expect(performanceRepository.performances).toHaveLength(1);
        expect(performanceRepository.performances.some(performance => performance.getId() === 1)).toBeFalsy();
    });

});