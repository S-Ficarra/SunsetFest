import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchandising } from 'src/domain/models/facility/shop/merchandising.model';
import { merchandisings } from 'src/database/entities/merchandisings.entity';
import { locations } from 'src/database/entities/locations.entity';
import { opening_times } from 'src/database/entities/opening_times.entity';
import { MerchandisingRepository } from 'src/domain/repositories/facility/shop/merchandising.repository';
import { mapMerchandisingEntityToModel, mapMerchandisingModelToEntity, mapMerchandisingModelToEntityEdit } from '../../mappers/facility/merchandising.mapper';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit, mapShopOpenTimesToEntity, mapShopOpenTimesToEntityEdit } from '../../mappers/facility/facility.mapper';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MerchandisingRepositoryImpl implements MerchandisingRepository {

    constructor(
        @InjectRepository(merchandisings)
        private merchandisingsRepository : Repository<merchandisings>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
        @InjectRepository(opening_times)
        private openTimesRepository : Repository<opening_times>
    ){};


    async getAllMerchandising(): Promise<Merchandising[]> {
        const allMerchandising = await this.merchandisingsRepository.find();
        const mappedMerchandisingPromises = allMerchandising.map( async merchandising_entity => {
            if (merchandising_entity) {
                const location_entity = await this.locationRepository.findOneBy({id : merchandising_entity.id});
                const openTime_entity = await this.openTimesRepository.findOneBy({id: merchandising_entity.opening__times_.id});
                return mapMerchandisingEntityToModel(merchandising_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
            };
            return null;
        });
        return Promise.all(mappedMerchandisingPromises);
    };

    async getMerchandisingById(merchandisingId: number): Promise<Merchandising> {
        const merchandising_entity = await this.merchandisingsRepository.findOneBy({id: merchandisingId});
        if (merchandising_entity) {        
            const location_entity = await this.locationRepository.findOneBy({id : merchandising_entity.location_.id});
            const openTime_entity = await this.openTimesRepository.findOneBy({id: merchandising_entity.opening__times_.id});
            return mapMerchandisingEntityToModel(merchandising_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
        };
        return null;
    };

    async createMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const location_entity = mapFacilityLocationToEntity(merchandising);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(merchandising);
        await this.openTimesRepository.save(openTime_entity);
        const merchToSave = mapMerchandisingModelToEntity(merchandising, location_entity, openTime_entity);
        const createdMerchandising = await this.merchandisingsRepository.save(merchToSave);
        merchandising.setId(createdMerchandising.id);
        return merchandising;
    };

    async editMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const merchandising_entity = await this.merchandisingsRepository.findOneBy({id: merchandising.getId()})
        const location_entity = mapFacilityLocationToEntityEdit(merchandising, merchandising_entity.location_.id);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntityEdit(merchandising, merchandising_entity.opening__times_.id);
        await this.openTimesRepository.save(openTime_entity);
        const editedMerchandising = mapMerchandisingModelToEntityEdit(merchandising, location_entity, openTime_entity);
        await this.merchandisingsRepository.save(editedMerchandising);
        merchandising.setId(editedMerchandising.id);
        return merchandising;
    };

    async deleteMerchandising(merchandisingId: number): Promise<void> {

        const merchToDelete = await this.merchandisingsRepository.findOneBy({id: merchandisingId});
        const location = await this.locationRepository.findOneBy({id: merchToDelete.location_.id});
        const openTimes = await this.openTimesRepository.findOneBy({id: merchToDelete.opening__times_.id});

        await this.openTimesRepository.delete(openTimes);
        await this.locationRepository.delete(location);
        await this.merchandisingsRepository.delete(merchandisingId);
    };

};