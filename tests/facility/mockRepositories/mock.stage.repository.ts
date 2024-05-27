import { Stage } from "../../../src/domain/models/facility/stage.model";
import { StageRepository } from "../../../src/domain/repositories/facility/stage.repository";

export class MockStageRepository implements StageRepository {


    public stages: Stage[] = [
        new Stage ('roxy', 125.366, 125.258, 3000),
        new Stage ('rainbow', 366.125, 852.258, 5000),
    ];

    setFakeIdToTest(): void {
        this.stages[0].setId(1)
        this.stages[1].setId(2)
    };

    getAllStages(): Stage[] {
        return this.stages;
    };

    getStageById(stageId: number): Stage {
        return this.stages[stageId - 1];
    };

    createStage(stage: Stage): void {
        this.stages.push(stage);
    };

    editStage(stage: Stage): void {
        let stageId = stage.getId();
        this.stages[stageId - 1] = stage;
    };
    
    deleteStage(stageId: number): void {
        this.stages = this.stages.filter(stage => stage.getId() !== stageId);
    };
};