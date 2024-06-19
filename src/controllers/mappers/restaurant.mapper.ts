import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";
import { RestaurantDto } from "../DTO/restaurant.dto";
import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";


export function mapRestaurantDtoToModel (createRestaurantDto: RestaurantDto) {

    const openAt = new Date (createRestaurantDto.openingTime);
    const closeAt = new Date (createRestaurantDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    const restaurant = new Restaurant (
        createRestaurantDto.name,
        createRestaurantDto.longitude,
        createRestaurantDto.latitude,
        openingTimes,
        createRestaurantDto.foodType
    );

    return restaurant;
};


export function mapRestaurantDtoToModelEdit (restaurantToEdit: Restaurant, editRestaurantDto: RestaurantDto) {

    const openAt = new Date (editRestaurantDto.openingTime);
    const closeAt = new Date (editRestaurantDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    restaurantToEdit.setName(editRestaurantDto.name);
    restaurantToEdit.setLongitude(editRestaurantDto.longitude);
    restaurantToEdit.setLatitude(editRestaurantDto.latitude);
    restaurantToEdit.setOpeningTimes(openingTimes);
    restaurantToEdit.setFoodType(editRestaurantDto.foodType)

    return restaurantToEdit;

};