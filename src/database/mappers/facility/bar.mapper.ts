import { bars } from "src/database/entities/bars.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { Bar } from "src/domain/models/facility/shop/bar.model";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";

export function mapBarModelToEntity (model: Bar, fkLocation: number, fkOpenTimes: number): bars{
    const entity = new bars();
    entity.name = model.getName();
    entity.location_ = fkLocation;
    entity.opening__times_ = fkOpenTimes;
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

