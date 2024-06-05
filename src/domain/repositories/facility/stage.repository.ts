import { Stage } from "../../models/facility/stage.model"; 

export interface StageRepository {

    getAllStages(): Promise <Stage[]>;
    getStageById(stageId: number): Promise <Stage | undefined>;
    createStage(stage: Stage): Promise <Stage>;
    editStage(stage: Stage): Promise <Stage>;
    deleteStage(stageId: number): Promise <void>;

};
