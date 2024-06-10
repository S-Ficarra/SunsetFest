import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchandising } from 'src/domain/models/facility/shop/merchandising.model';
import { merchandisings } from 'src/database/entities/merchandisings.entity';
import { locations } from 'src/database/entities/locations.entity';
import { opening_times } from 'src/database/entities/opening_times.entity';
import { MerchandisingRepository } from 'src/domain/repositories/facility/shop/merchandising.repository';
import { mapMerchandisingEntityToModel, mapMerchandisingModelToEntity } from '../../mappers/facility/merchandising.mapper';
import { mapFacilityLocationToEntity, mapShopOpenTimesToEntity } from '../../mappers/facility/facility.mapper';


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
            const location_entity = await this.locationRepository.findOneBy({id : merchandising_entity.id});
            const openTime_entity = await this.openTimesRepository.findOneBy({id: merchandising_entity.opening__times_});
            return mapMerchandisingEntityToModel(merchandising_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
        });
        return Promise.all(mappedMerchandisingPromises);
    };

    async getMerchandisingById(merchandisingId: number): Promise<Merchandising> {
        const merchandising_entity = await this.merchandisingsRepository.findOneBy({id: merchandisingId});
        const location_entity = await this.locationRepository.findOneBy({id : merchandising_entity.id});
        const openTime_entity = await this.openTimesRepository.findOneBy({id: merchandising_entity.opening__times_});
        return mapMerchandisingEntityToModel(merchandising_entity, location_entity.longitude, location_entity.latitude, openTime_entity);
    };

    async createMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const location_entity = mapFacilityLocationToEntity(merchandising);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(merchandising);
        await this.openTimesRepository.save(openTime_entity);
        const createdMerchandising = mapMerchandisingModelToEntity(merchandising, location_entity.id, openTime_entity.id);
        merchandising.setId(createdMerchandising.id);
        return merchandising;
    };

    async editMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const location_entity = mapFacilityLocationToEntity(merchandising);
        await this.locationRepository.save(location_entity);
        const openTime_entity = mapShopOpenTimesToEntity(merchandising);
        await this.openTimesRepository.save(openTime_entity);
        const editedMerchandising = mapMerchandisingModelToEntity(merchandising, location_entity.id, openTime_entity.id);
        merchandising.setId(editedMerchandising.id);
        return merchandising;
    };

    async deleteMerchandising(merchandisingId: number): Promise<void> {
        this.merchandisingsRepository.delete(merchandisingId);
    };
};