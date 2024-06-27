import { campings } from "../../../database/entities/campings.entity";
import { locations } from "../../../database/entities/locations.entity";
import { Camping } from "../../../domain/models/facility/camping.model";

export function mapCampingModelToEntity (model: Camping, location: locations): campings {

    const entity = new campings();
    entity.name = model.getName();
    entity.location_ = location;
    entity.capacity = model.getCapacity();
    return entity;
};

export function mapCampingModelToEntityEdit (model: Camping, location: locations): campings {

    const entity = new campings();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.location_ = location;
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
