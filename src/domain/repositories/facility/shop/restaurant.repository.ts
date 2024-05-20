import { Restaurant } from "../../../models/facility/shop/restaurant.model"; 
import { ShopRepository } from "./shop.repository";

export interface RestaurantRepository extends ShopRepository{

    getAllRestaurants(): Restaurant[];
    getRestaurantById(id: number): Restaurant | undefined;
    createRestaurant(restaurant: Restaurant): void;
    editRestaurant(restaurant: Restaurant): void;
    deleteRestaurant(id: number): void;

};
