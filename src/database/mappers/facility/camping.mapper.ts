import { campings } from "src/database/entities/campings.entity";
import { Camping } from "src/domain/models/facility/camping.model";

export function mapCampingModelToEntity (model: Camping, fkLocation: number): campings {

    const entity = new campings();
    entity.name = model.getName();
    entity.location_ = fkLocation;
    entity.capacity = model.getCapacity();
    return entity;
};

export function mapCampingEntityToModel (entity: campings, longitude: number, latitude: number): Camping {

    const camping = new Camping(
        entity.name,
        longitude,
        latitude,
        entity.capacity
    );
    camping.setId(entity.id);
    return camping;
};
