import { restaurants } from "src/database/entities/restaurants.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";

export function mapRestaurantModelToEntity (model: Restaurant, fkLocation: number, fkOpenTimes: number): restaurants{
    const entity = new restaurants();
    entity.name = model.getName();
    entity.food_type = model.getFoodType();
    entity.location_ = fkLocation;
    entity.opening__times_ = fkOpenTimes;
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
