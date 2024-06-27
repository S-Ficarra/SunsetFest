import { Stage } from "../../../domain/models/facility/stage.model";
import { stages } from "../../../database/entities/stages.entity";
import { locations } from "../../../database/entities/locations.entity";

export function mapStageModelToEntity (model: Stage, location: locations): stages {
    const entity = new stages();
    entity.name = model.getName();
    entity.capacity = model.getCapacity();
    entity.location_ = location ;
    return entity;
};

export function mapStageModelToEntityEdit (model: Stage, location: locations): stages {
    const entity = new stages();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.capacity = model.getCapacity();
    entity.location_ = location ;
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
