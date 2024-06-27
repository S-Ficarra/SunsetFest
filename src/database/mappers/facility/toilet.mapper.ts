import { locations } from "../../../database/entities/locations.entity";
import { toilets } from "../../../database/entities/toilets.entity";
import { Toilet } from "../../../domain/models/facility/toilet.model";

export function mapToiletModelToEntity (model: Toilet, Location: locations): toilets {

    const entity = new toilets();
    entity.name = model.getName(),
    entity.location_ = Location
    return entity;
};

export function mapToiletModelToEntityEdit (model: Toilet, Location: locations): toilets {

    const entity = new toilets();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.location_ = Location;
    return entity;
};

export function mapToiletEntityToModel (entity: toilets, longitude: number, latitude: number): Toilet {

    const toilet = new Toilet (
        entity.name,
        longitude,
        latitude,
    );
    toilet.setId(entity.id);
    return toilet;
};
