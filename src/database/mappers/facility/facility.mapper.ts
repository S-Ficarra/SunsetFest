import { locations } from "../../../database/entities/locations.entity";
import { opening_times } from "../../../database/entities/opening_times.entity";
import { Facility } from "../../../domain/models/facility/facility.model";
import { Shop } from "../../../domain/models/facility/shop/shop.model";


export function mapFacilityLocationToEntity(model: Facility): locations {
    const location_entity = new locations();
    location_entity.facility_type = model.getType();
    location_entity.longitude = model.getLongitude();
    location_entity.latitude = model.getLatitude();
    return location_entity;
};

export function mapFacilityLocationToEntityEdit(model: Facility, locEntityId : number): locations {
    const location_entity = new locations();
    location_entity.id = locEntityId
    location_entity.facility_type = model.getType();
    location_entity.longitude = model.getLongitude();
    location_entity.latitude = model.getLatitude();
    return location_entity;
};

export function mapShopOpenTimesToEntity (model: Shop): opening_times{
    const openTimes_entity = new opening_times();
    openTimes_entity.opening_time = model.getOpeningTimes().getOpenAt();
    openTimes_entity.closing_time = model.getOpeningTimes().getCloseAt();
    return openTimes_entity;
};

export function mapShopOpenTimesToEntityEdit (model: Shop, openTimeId: number): opening_times{
    const openTimes_entity = new opening_times();
    openTimes_entity.id = openTimeId;
    openTimes_entity.opening_time = model.getOpeningTimes().getOpenAt();
    openTimes_entity.closing_time = model.getOpeningTimes().getCloseAt();
    return openTimes_entity;
};