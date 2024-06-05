import { Stage } from "src/domain/models/facility/stage.model";
import { StageRepository } from "src/domain/repositories/facility/stage.repository";

export class StageService {

    constructor(private stageRepository : StageRepository){};

    async getAllStages(): Promise<Stage[]> {
        return this.stageRepository.getAllStages();
    };

    async getStageById(stageId: number): Promise<Stage> {
        return this.stageRepository.getStageById(stageId);
    };

    async createStage(stage: Stage): Promise<Stage> {
        this.stageRepository.createStage(stage);
        return stage;
    };

    async editStage(stage: Stage): Promise<Stage> {
        this.stageRepository.editStage(stage);
        return stage;
    };

    async deleteStage(stageId: number): Promise<void> {
        this.stageRepository.deleteStage(stageId);
    };

};