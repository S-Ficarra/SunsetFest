import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";
import { RestaurantRepository } from "src/domain/repositories/facility/shop/restaurant.repository";

export class RestaurantService{

    constructor(private restaurantRepository : RestaurantRepository){};

    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantRepository.getAllRestaurants();
    };

    async getRestaurantById(restaurantId: number): Promise<Restaurant> {
        return this.restaurantRepository.getRestaurantById(restaurantId);
    };

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        this.restaurantRepository.createRestaurant(restaurant);
        return restaurant;
    };

    async editRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        this.restaurantRepository.editRestaurant(restaurant);
        return restaurant;
    };

    async deleteRestaurant(restaurantId: number): Promise<void> {
        this.restaurantRepository.deleteRestaurant(restaurantId);
    };

};



