import { Restaurant } from "../../../models/facility/shop/restaurant.model"; 

export interface RestaurantRepository {

    getAllRestaurants(): Promise <Restaurant[]>;
    getRestaurantById(restaurantId: number): Promise <Restaurant | undefined>;
    createRestaurant(restaurant: Restaurant): Promise <Restaurant>;
    editRestaurant(restaurant: Restaurant): Promise <Restaurant>;
    deleteRestaurant(restaurantId: number): Promise <void>;

};
