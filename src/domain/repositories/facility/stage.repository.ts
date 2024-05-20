import { Stage } from "../../models/facility/stage.model"; 

export interface StageRepository {

    getAllStages(): Stage[];
    getStageById(id: number): Stage | undefined;
    createStage(stage: Stage): void;
    editStage(stage: Stage): void;
    deleteStage(id: number): void;

};
