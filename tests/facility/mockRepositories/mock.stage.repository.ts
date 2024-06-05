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

    async getAllStages(): Promise<Stage[]> {
        return this.stages;
    };

    async getStageById(stageId: number): Promise<Stage> {
        return this.stages[stageId - 1];
    };

    async createStage(stage: Stage): Promise<Stage> {
        this.stages.push(stage);
        return stage;
    };

    async editStage(stage: Stage): Promise<Stage> {
        let stageId = stage.getId();
        this.stages[stageId - 1] = stage;
        return stage;
    };
    
    async deleteStage(stageId: number): Promise<void> {
        this.stages = this.stages.filter(stage => stage.getId() !== stageId);
    };
};