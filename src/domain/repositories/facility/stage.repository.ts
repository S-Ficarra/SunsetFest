import { Stage } from "../../models/facility/stage.model"; 

export interface StageRepository {

    getAllStages(): Stage[];
    getStageById(stageId: number): Stage | undefined;
    createStage(stage: Stage): void;
    editStage(stage: Stage): void;
    deleteStage(stageId: number): void;

};
