import { Stage } from "src/domain/models/facility/stage.model";
import { stages } from "src/database/entities/stages.entity";

export function mapStageModelToEntity (model: Stage, fkLocation: number): stages {
    const entity = new stages();
    entity.name = model.getName();
    entity.capacity = model.getCapacity();
    entity.location_ = fkLocation;
    return entity;
};

export function mapStageEntityToModel (entity: stages, longitude: number, latitude: number): Stage {
    const stage = new Stage (
        entity.name,
        longitude,
        latitude,
        entity.capacity
    );
    stage.setId(entity.id);
    return stage;
};
