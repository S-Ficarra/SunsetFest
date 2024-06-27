import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../../../domain/models/facility/shop/restaurant.model';
import { restaurants } from '../../../database/entities/restaurants.entity';
import { locations } from '../../../database/entities/locations.entity';
import { opening_times } from '../../../database/entities/opening_times.entity';
import { RestaurantRepository } from '../../../domain/repositories/facility/shop/restaurant.repository';
import { mapRestaurantEntityToModel, mapRestaurantModelToEntity, mapRestaurantModelToEntityEdit } from '../../mappers/facility/restaurant.mapper';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit, mapShopOpenTimesToEntity, mapShopOpenTimesToEntityEdit } from '../../mappers/facility/facility.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
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
            if (restaurant_entity) {
                const location_entity = await this.locationRepository.findOneBy({id : restaurant_entity.id});
                const openTime_entity = await this.openTimesRepository.findOneBy({id: restaurant_entity.opening__times_.id});
                return mapRestaurantEntityToModel(restaurant_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
            };
            return null;
        });
        return Promise.all(mappedRestaurantPromises);
    };
    

    async getRestaurantById(restaurantId: number): Promise<Restaurant> {
        const restaurant_entity = await this.restaurantsRepository.findOneBy({id: restaurantId});
        if (restaurant_entity) {
            const location_entity = await this.locationRepository.findOneBy({id : restaurant_entity.location_.id});
            const openTime_entity = await this.openTimesRepository.findOneBy({id: restaurant_entity.opening__times_.id});
            return mapRestaurantEntityToModel(restaurant_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
        };
        return null;
    };

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const location_entity = mapFacilityLocationToEntity(restaurant);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(restaurant);
        await this.openTimesRepository.save(openTime_entity);
        const restaurantToSave = mapRestaurantModelToEntity(restaurant, location_entity, openTime_entity);
        const createdRestaurant = await this.restaurantsRepository.save(restaurantToSave);
        restaurant.setId(createdRestaurant.id);
        return restaurant;
    };

    async editRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const restaurantToEdit = await this.restaurantsRepository.findOneBy({id: restaurant.getId()});        
        const location_entity = mapFacilityLocationToEntityEdit(restaurant, restaurantToEdit.location_.id);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntityEdit(restaurant, restaurantToEdit.opening__times_.id);
        await this.openTimesRepository.save(openTime_entity);
        const editedRestaurant = mapRestaurantModelToEntityEdit(restaurant, location_entity, openTime_entity);
        await this.restaurantsRepository.save(editedRestaurant)
        restaurant.setId(editedRestaurant.id);
        return restaurant;
    };

    async deleteRestaurant(restaurantId: number): Promise<void> {
        const restaurantToDelete = await this.restaurantsRepository.findOneBy({id: restaurantId});
        const location = await this.locationRepository.findOneBy({id: restaurantToDelete.location_.id});
        const openTimes = await this.openTimesRepository.findOneBy({id: restaurantToDelete.opening__times_.id});

        await this.openTimesRepository.delete(openTimes);
        await this.locationRepository.delete(location);
        await this.restaurantsRepository.delete(restaurantId);
    };
};