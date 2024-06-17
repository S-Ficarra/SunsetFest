import { Inject } from "@nestjs/common";
import { Stage } from "src/domain/models/facility/stage.model";
import { StageRepository } from "src/domain/repositories/facility/stage.repository";

export class StageService {

    constructor( @Inject('StageRepository') private stageRepository : StageRepository){};

    async getAllStages(): Promise<Stage[]> {
        return await this.stageRepository.getAllStages();
    };

    async getStageById(stageId: number): Promise<Stage> {
        const stage = await this.stageRepository.getStageById(stageId);
        if (stage) {
            return stage
        };
        throw new Error (`Stage ${stageId} do not exist`);
    };

    async createStage(stage: Stage): Promise<Stage> {
        await this.stageRepository.createStage(stage);
        return stage;
    };

    async editStage(stage: Stage): Promise<Stage> {
        await this.stageRepository.editStage(stage);
        return stage;
    };

    async deleteStage(stageId: number): Promise<void> {
        await this.stageRepository.deleteStage(stageId);
    };

};