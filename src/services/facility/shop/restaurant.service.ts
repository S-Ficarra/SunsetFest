import { Inject } from "@nestjs/common";
import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";
import { RestaurantRepository } from "src/domain/repositories/facility/shop/restaurant.repository";

export class RestaurantService{

    constructor( @Inject('RestaurantRepository') private restaurantRepository : RestaurantRepository){};

    async getAllRestaurants(): Promise<Restaurant[]> {
        return await this.restaurantRepository.getAllRestaurants();
    };

    async getRestaurantById(restaurantId: number): Promise<Restaurant> {
        const restaurant =  await this.restaurantRepository.getRestaurantById(restaurantId);
        if (restaurant) {
            return restaurant;
        };
        throw new Error (`Restaurant ${restaurantId} do not exist`);
    };

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const createdRestaurant = await this.restaurantRepository.createRestaurant(restaurant);
        return createdRestaurant;
    };

    async editRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const editedRestaurant = await this.restaurantRepository.editRestaurant(restaurant);
        return editedRestaurant;
    };

    async deleteRestaurant(restaurantId: number): Promise<void> {
        await this.restaurantRepository.deleteRestaurant(restaurantId);
    };

};



