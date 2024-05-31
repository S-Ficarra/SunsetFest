import { TimeFrame } from "../../../src/domain/models/program/performance/timeFrame.model";
import { TimeFrameService } from "../../../src/services/program/performance/timeFrame.service";
import { MockTimeFrameRepository } from "./mock.timeFrame.repository";


describe('TimeFrameService', () => {
    let timeFrameService: TimeFrameService;
    let timeFrameRepository: MockTimeFrameRepository;


    beforeEach(() => {
        timeFrameRepository = new MockTimeFrameRepository();
        timeFrameService = new TimeFrameService(timeFrameRepository);
        timeFrameRepository.setFakeIdToTest();     
    });


    //getTimeFrameById
    it('Should return the timeFrame id 1 with the time 08:00 & 10:00', () => {
        const foundTimeFrame1 = timeFrameService.getTimeFrameById(1);
        expect(foundTimeFrame1).toEqual(timeFrameRepository.timeFrameArray[0]);
    });


    //createTimeFrame
    it('should return the new timeFrame created', () => {
        let startingAt = new Date (2000, 1, 1, 8, 0, 0)
        let endingAt = new Date (2000, 1, 1, 10, 0, 0)
        let foundTimeFrame3 = timeFrameService.createTimeFrame(startingAt, endingAt);
        expect(foundTimeFrame3).toEqual(timeFrameRepository.timeFrameArray[2]);
    });


    //editTimeFrame
    it('should return the timeFrame1 with time edited', () => {
        let editedTimeFrame = new TimeFrame(
            new Date(0, 0, 0, 14, 0, 0), // start at 14:00
            new Date(0, 0, 0, 16, 0, 0) // end at 16:00
        );
        editedTimeFrame.setId(1);
        let foundTimeFrameEdited = timeFrameService.editTimeFrame(editedTimeFrame);
        expect(foundTimeFrameEdited).toEqual(expect.objectContaining(timeFrameRepository.timeFrameArray[0]));        
    });


    //deleteTimeFrame
    it('should return the timeFrames array without the timeFrame with id1', () => {
        timeFrameService.deleteTimeFrame(1)
        let allTimeFrame = timeFrameRepository.timeFrameArray
        expect(allTimeFrame.some(timeFrame => timeFrame.getId() === 1)).toBeFalsy();
    });


});
