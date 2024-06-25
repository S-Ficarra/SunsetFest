import { bars } from "src/database/entities/bars.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { Bar } from "src/domain/models/facility/shop/bar.model";
import { OpeningTimes } from "src/domain/models/facility/shop/openingTimes.model";
import { locations } from "src/database/entities/locations.entity";

export function mapBarModelToEntity (model: Bar, Location: locations, OpenTimes: opening_times): bars{
    const entity = new bars();
    entity.name = model.getName();
    entity.location_ = Location;
    entity.opening__times_ = OpenTimes;
    return entity;
};

export function mapBarModelToEntityEdit (model: Bar, Location: locations, OpenTimes: opening_times): bars{
    const entity = new bars();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.location_ = Location;
    entity.opening__times_ = OpenTimes;
    return entity;
};

export function mapBarEntityToModel (entity: bars, longitude: number, latitude: number, openTime_entity: opening_times): Bar {

    const open_times = new OpeningTimes(
        openTime_entity.opening_time,
        openTime_entity.closing_time
    );

    const bar = new Bar (
        entity.name,
        longitude,
        latitude,
        open_times
    );

    bar.setId(entity.id);
    return bar;
};

