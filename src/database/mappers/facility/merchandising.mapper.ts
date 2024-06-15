import { merchandisings } from "src/database/entities/merchandisings.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";

export function mapMerchandisingModelToEntity (model: Merchandising, fkLocation: number, fkOpenTimes: number): merchandisings {

    const entity = new merchandisings();
    entity.name = model.getName();
    entity.merch_type = model.getMerchType();
    entity.location_ = fkLocation;
    entity.opening__times_ = fkOpenTimes;
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
