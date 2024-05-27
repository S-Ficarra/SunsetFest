import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";
import { RestaurantRepository } from "src/domain/repositories/facility/shop/restaurant.repository";

export class RestaurantService{

    constructor(private restaurantRepository : RestaurantRepository){};

    getAllRestaurants(): Restaurant[] {
        return this.restaurantRepository.getAllRestaurants();
    };

    getRestaurantById(restaurantId: number): Restaurant {
        return this.restaurantRepository.getRestaurantById(restaurantId);
    };

    createRestaurant(restaurant: Restaurant): Restaurant {
        this.restaurantRepository.createRestaurant(restaurant);
        return restaurant;
    };

    editRestaurant(restaurant: Restaurant): Restaurant {
        this.restaurantRepository.editRestaurant(restaurant);
        return restaurant;
    };

    deleteRestaurant(restaurantId: number): void {
        this.restaurantRepository.deleteRestaurant(restaurantId);
    };

};



