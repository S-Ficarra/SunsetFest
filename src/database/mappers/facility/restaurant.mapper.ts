import { restaurants } from "../../../database/entities/restaurants.entity";
import { opening_times } from "../../../database/entities/opening_times.entity";
import { Restaurant } from "../../../domain/models/facility/shop/restaurant.model";
import { OpeningTimes } from "../../../domain/models/facility/shop/openingTimes.model";
import { locations } from "../../../database/entities/locations.entity";

export function mapRestaurantModelToEntity (model: Restaurant, Location: locations, openTimes: opening_times): restaurants{
    const entity = new restaurants();
    entity.name = model.getName();
    entity.food_type = model.getFoodType();
    entity.location_ = Location;
    entity.opening__times_ = openTimes;
    return entity;
};

export function mapRestaurantModelToEntityEdit (model: Restaurant, location: locations, openTimes: opening_times): restaurants{
    const entity = new restaurants();
    entity.id = model.getId();
    entity.name = model.getName();
    entity.food_type = model.getFoodType();
    entity.location_ = location;
    entity.opening__times_ = openTimes;
    return entity;
};

export function mapRestaurantEntityToModel (entity: restaurants, longitude: number, latitude: number, openTime_entity: opening_times) : Restaurant {

    const open_times = new OpeningTimes(
        openTime_entity.opening_time,
        openTime_entity.closing_time
    );

    const restaurant = new Restaurant (
        entity.name,
        longitude,
        latitude,
        open_times,
        entity.food_type
    );

    restaurant.setId(entity.id);
    return restaurant;

};
