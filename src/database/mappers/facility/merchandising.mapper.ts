import { merchandisings } from "../../../database/entities/merchandisings.entity";
import { opening_times } from "../../../database/entities/opening_times.entity";
import { Merchandising } from "../../../domain/models/facility/shop/merchandising.model";
import { OpeningTimes } from "../../../domain/models/facility/shop/openingTimes.model";
import { locations } from "../../../database/entities/locations.entity";

export function mapMerchandisingModelToEntity (model: Merchandising, location: locations, openTimes: opening_times): merchandisings {

    const entity = new merchandisings();
    entity.name = model.getName();
    entity.merch_type = model.getMerchType();
    entity.location_ = location;
    entity.opening__times_ = openTimes;
    return entity;
};

export function mapMerchandisingModelToEntityEdit (model: Merchandising, location: locations, openTimes: opening_times): merchandisings {

    const entity = new merchandisings();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.merch_type = model.getMerchType();
    entity.location_ = location;
    entity.opening__times_ = openTimes;
    return entity;
};

export function mapMerchandisingEntityToModel (entity: merchandisings, longitude: number, latitude: number, openTime_entity: opening_times): Merchandising {

    const open_times = new OpeningTimes(
        openTime_entity.opening_time,
        openTime_entity.closing_time
    );

    const merchandising = new Merchandising (
        entity.name,
        longitude,
        latitude,
        open_times,
        entity.merch_type
    );

    merchandising.setId(entity.id);
    return merchandising;
};
