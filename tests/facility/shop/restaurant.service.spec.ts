import { OpeningTimesService } from "../../../src/services/facility/openingTimes.service";
import { Restaurant } from "../../../src/domain/models/facility/shop/restaurant.model";
import { RestaurantService } from "../../../src/services/facility/shop/restaurant.service";
import { MockRestaurantRepository } from "../mockRepositories/mockShopRepositotory/mock.restaurant.repository";
import { MockOpeningTimesRepository } from "../mockRepositories/mock.openingTimes.repository";



describe('RestaurantService', () => {
    let restaurantService: RestaurantService;
    let restaurantRepository: MockRestaurantRepository;
    let openingTimesService: OpeningTimesService;
    let openingTimesRepository: MockOpeningTimesRepository;


    beforeEach(() => {
        openingTimesRepository = new MockOpeningTimesRepository();
        openingTimesService = new OpeningTimesService(openingTimesRepository);
        restaurantRepository = new MockRestaurantRepository(openingTimesService);
        restaurantService = new RestaurantService(restaurantRepository);
        restaurantRepository.setFakeIdToTest();
    });

    //getAllRestaurants
    it('Should return all restaurants', () => {
        const restaurants = restaurantService.getAllRestaurants();
        expect(restaurants).toHaveLength(2);
        expect(restaurants).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'hell burger', _foodType: 'burger'}),
            expect.objectContaining({_name: 'hell hotdog', _foodType: 'hotdog'})
        ]));
    });


    //getRestaurantById
    it('Should return the restaurant id 1', () => {
        const foundRestaurant1 = restaurantService.getRestaurantById(1);
        expect(foundRestaurant1).toEqual(expect.objectContaining({_name: 'hell burger', _foodType: 'burger'}));
    });


    //createRestaurant
    it('should return the new restaurant created', () => {
        let restaurant3OT = restaurantRepository.createOpeningTimes();
        let foundRestaurant3 = new Restaurant ('hell tacos', 987.654, 456.951, restaurant3OT, 'tacos');
        restaurantService.createRestaurant(foundRestaurant3);
        expect(foundRestaurant3).toEqual(expect.objectContaining({_name:'hell tacos', _foodType: 'tacos'}));
    });


    //editRestaurant
    it('should return the restaurant1 with name and foddType edited', () => {
        let restaurant3OT = restaurantRepository.createOpeningTimes();
        let editedRestaurant = new Restaurant ('hell tacos', 987.654, 456.951, restaurant3OT, 'tacos');
        editedRestaurant.setId(1);
        let foundRestaurantEdited = restaurantService.editRestaurant(editedRestaurant);
        expect(foundRestaurantEdited).toEqual(expect.objectContaining({_name: 'hell tacos', _foodType: 'tacos'}));        
    });


    //deleteRestaurant
    it('should return the restaurants array without the restaurant with id 1', () => {
        restaurantService.deleteRestaurant(1)
        let allRestaurants = restaurantRepository.restaurants
        expect(allRestaurants.some(restaurants => restaurants.getId() === 1)).toBeFalsy();
    });


});
 