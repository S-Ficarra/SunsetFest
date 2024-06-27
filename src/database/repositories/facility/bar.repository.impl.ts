import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bar } from '../../../domain/models/facility/shop/bar.model';
import { bars } from '../../../database/entities/bars.entity';
import { locations } from '../../../database/entities/locations.entity';
import { opening_times } from '../../../database/entities/opening_times.entity';
import { BarRepository } from '../../../domain/repositories/facility/shop/bar.repository';
import { mapBarEntityToModel, mapBarModelToEntity, mapBarModelToEntityEdit } from '../../mappers/facility/bar.mapper';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit, mapShopOpenTimesToEntity, mapShopOpenTimesToEntityEdit } from '../../mappers/facility/facility.mapper';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BarRepositoryImpl implements BarRepository {

    constructor(
        @InjectRepository(bars)
        private barRepository : Repository<bars>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
        @InjectRepository(opening_times)
        private openTimesRepository : Repository<opening_times>
    ){};


    async getAllBars(): Promise<Bar[]> {
        const allBars = await this.barRepository.find();
        const mappedBarPromises = allBars.map( async bar_entity => {
            if (bar_entity) {
                const location_entity = await this.locationRepository.findOneBy({id: bar_entity.location_.id});
                const openTimes_entity = await this.openTimesRepository.findOneBy({id: bar_entity.opening__times_.id});
                return mapBarEntityToModel(bar_entity, location_entity.longitude, location_entity.latitude, openTimes_entity);
            };
            return null;
        });
        return Promise.all(mappedBarPromises);
    };

    async getBarById(barId: number): Promise<Bar> {
        const bar_entity = await this.barRepository.findOneBy({id: barId});
        if (bar_entity) {
            const location_entity = await this.locationRepository.findOneBy({id: bar_entity.location_.id});
            const openTimes_entity = await this.openTimesRepository.findOneBy({id: bar_entity.opening__times_.id});
            return mapBarEntityToModel(bar_entity, location_entity.longitude, location_entity.latitude, openTimes_entity);
        };
        return null;
    };

    async createBar(bar: Bar): Promise<Bar> {
        const location_entity = mapFacilityLocationToEntity(bar);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(bar);
        await this.openTimesRepository.save(openTime_entity);
        const createdBar = mapBarModelToEntity(bar, location_entity, openTime_entity);
        await this.barRepository.save(createdBar);
        bar.setId(createdBar.id);
        return bar;
    };

    async editBar(bar: Bar): Promise<Bar> {
        const bar_entity = await this.barRepository.findOneBy({id: bar.getId()})
        const location_entity = mapFacilityLocationToEntityEdit(bar,bar_entity.location_.id);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntityEdit(bar, bar_entity.opening__times_.id);
        await this.openTimesRepository.save(openTime_entity);
        const editedBar = mapBarModelToEntityEdit(bar, location_entity, openTime_entity);
        await this.barRepository.save(editedBar);
        bar.setId(editedBar.id);
        return bar;
    };

    async deleteBar(barId: number): Promise<void> {
        const barToDelete = await this.barRepository.findOneBy({id: barId});
        const location = await this.locationRepository.findOneBy({id: barToDelete.location_.id});
        const openTimes = await this.openTimesRepository.findOneBy({id: barToDelete.opening__times_.id});

        await this.openTimesRepository.delete(openTimes);
        await this.locationRepository.delete(location);
        await this.barRepository.delete(barId);
    };   
};
