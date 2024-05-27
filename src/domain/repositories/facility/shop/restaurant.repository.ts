import { Restaurant } from "../../../models/facility/shop/restaurant.model"; 

export interface RestaurantRepository {

    getAllRestaurants(): Restaurant[];
    getRestaurantById(restaurantId: number): Restaurant | undefined;
    createRestaurant(restaurant: Restaurant): void;
    editRestaurant(restaurant: Restaurant): void;
    deleteRestaurant(restaurantId: number): void;

};
