import { OpeningTimesService } from "../../../../src/services/facility/openingTimes.service";
import { Restaurant } from "../../../../src/domain/models/facility/shop/restaurant.model";
import { RestaurantRepository } from "../../../../src/domain/repositories/facility/shop/restaurant.repository";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";
import { MockOpeningTimesRepository } from "../mock.openingTimes.repository";


export class MockRestaurantRepository implements RestaurantRepository {

    constructor(public openingTimesService : OpeningTimesService,
        public openingTimesRepository : MockOpeningTimesRepository
    ){};

    public restaurants: Restaurant[] = [
        new Restaurant ('hell burger', 123.546, 356.214, this.openingTimesRepository.openingTimesArray[0], 'burger'),
        new Restaurant ('hell hotdog', 987.654, 456.951, this.openingTimesRepository.openingTimesArray[1], 'hotdog')
    ];


    setFakeIdToTest(): void {
        this.restaurants[0].setId(1)
        this.restaurants[1].setId(2)
    };

    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurants;
    }

    async getRestaurantById(restaurantId: number): Promise<Restaurant> {
        return this.restaurants[restaurantId -1];
    };

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        restaurant.setId(this.restaurants.length + 1)
        this.restaurants.push(restaurant);
        return restaurant;
    };

    async editRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        let restaurantid = restaurant.getId();
        this.restaurants[restaurantid - 1] = restaurant;
        return restaurant;
    };

    async deleteRestaurant(restaurantId: number): Promise<void> {
        this.restaurants = this.restaurants.filter(restaurant => restaurant.getId() !== restaurantId);
    };

};