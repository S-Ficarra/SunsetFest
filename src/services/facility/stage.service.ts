import { Stage } from "src/domain/models/facility/stage.model";
import { StageRepository } from "src/domain/repositories/facility/stage.repository";

export class StageService {

    constructor(private stageRepository : StageRepository){};

    getAllStages(): Stage[] {
        return this.stageRepository.getAllStages();
    };

    getStageById(stageId: number): Stage {
        return this.stageRepository.getStageById(stageId);
    };

    createStage(stage: Stage): Stage {
        this.stageRepository.createStage(stage);
        return stage;
    };

    editStage(stage: Stage): Stage {
        this.stageRepository.editStage(stage);
        return stage;
    };

    deleteStage(stageId: number): void {
        this.stageRepository.deleteStage(stageId);
    };

};