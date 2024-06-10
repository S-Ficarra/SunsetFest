import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/domain/models/facility/shop/restaurant.model';
import { restaurants } from 'src/database/entities/restaurants.entity';
import { locations } from 'src/database/entities/locations.entity';
import { opening_times } from 'src/database/entities/opening_times.entity';
import { RestaurantRepository } from 'src/domain/repositories/facility/shop/restaurant.repository';
import { mapRestaurantEntityToModel, mapRestaurantModelToEntity } from '../../mappers/facility/restaurant.mapper';
import { mapFacilityLocationToEntity, mapShopOpenTimesToEntity } from '../../mappers/facility/facility.mapper';


export class RestaurantRepositoryImpl implements RestaurantRepository {

    constructor(
        @InjectRepository(restaurants)
        private restaurantsRepository : Repository<restaurants>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
        @InjectRepository(opening_times)
        private openTimesRepository : Repository<opening_times>
    ){};


    async getAllRestaurants(): Promise<Restaurant[]> {
        const allRestaurants = await this.restaurantsRepository.find();
        const mappedRestaurantPromises = allRestaurants.map( async restaurant_entity => {
            const location_entity = await this.locationRepository.findOneBy({id : restaurant_entity.id});
            const openTime_entity = await this.openTimesRepository.findOneBy({id: restaurant_entity.opening__times_});
            return mapRestaurantEntityToModel(restaurant_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
        });
        return Promise.all(mappedRestaurantPromises);
    };
    

    async getRestaurantById(restaurantId: number): Promise<Restaurant> {
        const restaurant_entity = await this.restaurantsRepository.findOneBy({id: restaurantId});
        const location_entity = await this.locationRepository.findOneBy({id : restaurant_entity.id});
        const openTime_entity = await this.openTimesRepository.findOneBy({id: restaurant_entity.opening__times_});
        return mapRestaurantEntityToModel(restaurant_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
    };

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const location_entity = mapFacilityLocationToEntity(restaurant);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(restaurant);
        await this.openTimesRepository.save(openTime_entity);
        const createdRestaurant = mapRestaurantModelToEntity(restaurant, location_entity.id, openTime_entity.id);
        restaurant.setId(createdRestaurant.id);
        return restaurant;
    };

    async editRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const location_entity = mapFacilityLocationToEntity(restaurant);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(restaurant);
        await this.openTimesRepository.save(openTime_entity);
        const editedRestaurant = mapRestaurantModelToEntity(restaurant, location_entity.id, openTime_entity.id);
        restaurant.setId(editedRestaurant.id);
        return restaurant;
    };

    async deleteRestaurant(restaurantId: number): Promise<void> {
        this.restaurantsRepository.delete(restaurantId);
    };
};