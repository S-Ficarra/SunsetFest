import { Performance } from "../../../src/domain/models/program/performance/performance.model";
import { PerformanceService } from "../../../src/services/program/performance/performance.service";
import { MockPerformanceRepository } from "../performance/mock.performance.repository";
import { MockTimeFrameRepository } from "./mock.timeFrame.repository";
import { MockBandRepository } from "../../band/mock.band.repository";
import { MockStageRepository } from "../../facility/mockRepositories/mock.stage.repository";
import { MockSocialsRepository } from "../../band/mock.socials.repository";




describe('PerformanceService', () => {
    let socialRepository : MockSocialsRepository;
    let bandRepository : MockBandRepository;
    let stageRepository : MockStageRepository;
    let timeFrameRepository: MockTimeFrameRepository;
    let performanceService: PerformanceService;
    let performanceRepository: MockPerformanceRepository;


    beforeEach(() => {
        socialRepository = new MockSocialsRepository();
        bandRepository = new MockBandRepository(socialRepository)
        stageRepository = new MockStageRepository();
        timeFrameRepository = new MockTimeFrameRepository();
        socialRepository.setFakeIdToTest();
        bandRepository.setFakeIdToTest();
        stageRepository.setFakeIdToTest();
        timeFrameRepository.setFakeIdToTest();
        performanceRepository= new MockPerformanceRepository(bandRepository, timeFrameRepository, stageRepository);
        performanceService = new PerformanceService(performanceRepository);
        performanceRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
    });

    
    //getAllPerformance
    it('should return all performance', () => {
        const performance = performanceService.getAllPerformances();
        expect(performance).toHaveLength(2);
        expect(performance).toEqual(expect.arrayContaining([
            expect.objectContaining({_day: 1, _bandId: 1, _stageId: 1}),
            expect.objectContaining({_day: 2, _bandId: 2, _stageId: 2})
        ]));
    });

    //getPerformanceById
    it("should return a performance by it's id", () => {
        let foundPerformance1 = performanceService.getPerformanceById(1);
        expect(foundPerformance1).toEqual(expect.objectContaining({_day: 1, _bandId: 1, _stageId: 1}));
    });



    //createPerformance
    it('should return a performance just created', () => {
        const foundPerformance3 = new Performance (bandRepository.getBandById(2).getId(), 3, timeFrameRepository.getTimeFrameById(1).getId(), stageRepository.getStageById(1).getId());
        performanceService.createPerformance(foundPerformance3); 
        expect(foundPerformance3).toEqual(expect.objectContaining({_day: 3, _bandId: 2, _stageId: 1}));

    });

    
    //editPerformance
    it('should return a performance with titleEdited and textEdited', () => {
        const performanceEdited = new Performance (bandRepository.getBandById(2).getId(), 3, timeFrameRepository.getTimeFrameById(1).getId(), stageRepository.getStageById(1).getId());
        performanceEdited.setId(1)
        const foundPerformanceEdited = performanceService.editPerformance(performanceEdited);
        expect(foundPerformanceEdited).toEqual(expect.objectContaining({_day: 3, _bandId: 2, _stageId: 1}));

    });

    //deletePerformance
    it('should return the performance list without the one with id 1', () => {
        performanceService.deletePerformance(1)
        expect(performanceRepository.performances).toHaveLength(1);
        expect(performanceRepository.performances.some(performance => performance.getId() === 1)).toBeFalsy();
    });

});