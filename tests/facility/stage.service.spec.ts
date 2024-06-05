import { Stage } from "../../src/domain/models/facility/stage.model";
import { StageService } from "../../src/services/facility/stage.service";
import { MockStageRepository } from "./mockRepositories/mock.stage.repository";


describe('StageService', () => {
    let stageService: StageService;
    let stageRepository: MockStageRepository;


    beforeEach(() => {
        stageRepository = new MockStageRepository();
        stageService = new StageService(stageRepository/*, facilityService*/);
        stageRepository.setFakeIdToTest();
    });

    //getAllStages
    it('Should return all stages', async () => {
        const stages = await stageService.getAllStages();
        expect(stages).toHaveLength(2);
        expect(stages).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'roxy', _capacity: 3000}),
            expect.objectContaining({_name: 'rainbow', _capacity: 5000})
        ]));
    });


    //getStageById
    it('Should return the stage id 1 with the question: question 1', async () => {
        const foundStage1 = await stageService.getStageById(1);
        expect(foundStage1).toEqual(expect.objectContaining({_name: 'roxy', _capacity: 3000}));
    });


    //createStage
    it('should return the new stage created', async () => {
        let foundStage3 = new Stage ('whiskey', 987.459, 415.596, 10000);
        await stageService.createStage(foundStage3);
        expect(foundStage3).toEqual(expect.objectContaining({_name: 'whiskey', _capacity: 10000}));
    });


    //editStage
    it('should return the stage1 with name edited', async () => {
        let editedStage = new Stage ('viper', 125.366, 125.258, 7000);
        editedStage.setId(1);
        let foundStageEdited = await stageService.editStage(editedStage);
        expect(foundStageEdited).toEqual(expect.objectContaining({_name: 'viper', _capacity: 7000}));        
    });


    //deleteStage
    it('should return the stages array without the stage with id1', async () => {
        await stageService.deleteStage(1)
        let allStages = stageRepository.stages
        expect(allStages.some(stages => stages.getId() === 1)).toBeFalsy();
    });


});
