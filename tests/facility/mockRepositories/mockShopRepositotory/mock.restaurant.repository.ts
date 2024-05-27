import { OpeningTimesService } from "../../../../src/services/facility/openingTimes.service";
import { Restaurant } from "../../../../src/domain/models/facility/shop/restaurant.model";
import { RestaurantRepository } from "../../../../src/domain/repositories/facility/shop/restaurant.repository";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";


export class MockRestaurantRepository implements RestaurantRepository {

    constructor(public openingTimesService : OpeningTimesService){};


    public restaurant1OT = this.openingTimesService.createOpeningTimes('08:00', '17:00');
    public restaurant2OT = this.openingTimesService.createOpeningTimes('09:00', '20:00');
    

    public restaurants: Restaurant[] = [
        new Restaurant ('hell burger', 123.546, 356.214, this.restaurant1OT, 'burger'),
        new Restaurant ('hell hotdog', 987.654, 456.951, this.restaurant2OT, 'hotdog')
    ];

    createOpeningTimes(): OpeningTimes {
        let newOpeningTime = this.openingTimesService.createOpeningTimes('11:30', '23:00');
        return newOpeningTime;
    }

    setFakeIdToTest(): void {
        this.restaurants[0].setId(1)
        this.restaurants[1].setId(2)
    };

    getAllRestaurants(): Restaurant[] {
        return this.restaurants;
    }

    getRestaurantById(restaurantId: number): Restaurant | undefined {
        return this.restaurants[restaurantId -1];
    };

    createRestaurant(restaurant: Restaurant): void {
        restaurant.setId(this.restaurants.length + 1)
        this.restaurants.push(restaurant);
        
    };

    editRestaurant(restaurant: Restaurant): void {
        let restaurantid = restaurant.getId();
        this.restaurants[restaurantid - 1] = restaurant;
    };

    deleteRestaurant(restaurantId: number): void {
        this.restaurants = this.restaurants.filter(restaurant => restaurant.getId() !== restaurantId);
    };

};