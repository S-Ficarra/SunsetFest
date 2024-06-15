import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bar } from 'src/domain/models/facility/shop/bar.model';
import { bars } from 'src/database/entities/bars.entity';
import { locations } from 'src/database/entities/locations.entity';
import { opening_times } from 'src/database/entities/opening_times.entity';
import { BarRepository } from 'src/domain/repositories/facility/shop/bar.repository';
import { mapBarEntityToModel, mapBarModelToEntity } from '../../mappers/facility/bar.mapper';
import { mapFacilityLocationToEntity, mapShopOpenTimesToEntity } from '../../mappers/facility/facility.mapper';


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
            const location_entity = await this.locationRepository.findOneBy({id: bar_entity.location_});
            const openTimes_entity = await this.openTimesRepository.findOneBy({id: bar_entity.opening__times_});
            return mapBarEntityToModel(bar_entity, location_entity.longitude, location_entity.latitude, openTimes_entity);
        });
        return Promise.all(mappedBarPromises);
    };

    async getBarById(barId: number): Promise<Bar> {
        const bar_entity = await this.barRepository.findOneBy({id: barId});
        const location_entity = await this.locationRepository.findOneBy({id: bar_entity.location_});
        const openTimes_entity = await this.openTimesRepository.findOneBy({id: bar_entity.opening__times_});
        return mapBarEntityToModel(bar_entity, location_entity.longitude, location_entity.latitude, openTimes_entity);
    };

    async createBar(bar: Bar): Promise<Bar> {
        const location_entity = mapFacilityLocationToEntity(bar);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(bar);
        await this.openTimesRepository.save(openTime_entity);
        const createdBar = mapBarModelToEntity(bar, location_entity.id, openTime_entity.id);
        bar.setId(createdBar.id);
        return bar;
    };

    async editBar(bar: Bar): Promise<Bar> {
        const location_entity = mapFacilityLocationToEntity(bar);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(bar);
        await this.openTimesRepository.save(openTime_entity);
        const editedBar = mapBarModelToEntity(bar, location_entity.id, openTime_entity.id);
        bar.setId(editedBar.id);
        return bar;
    };

    async deleteBar(barId: number): Promise<void> {
        this.barRepository.delete(barId);
    };   
};
