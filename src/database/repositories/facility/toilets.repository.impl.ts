import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Toilet } from 'src/domain/models/facility/toilet.model';
import { toilets } from '../../entities/toilets.entity';
import { locations } from '../../entities/locations.entity';
import { ToiletRepository } from 'src/domain/repositories/facility/toilet.repository';
import { mapFacilityLocationToEntity } from '../../mappers/facility/facility.mapper';
import { mapToiletEntityToModel, mapToiletModelToEntity } from '../../mappers/facility/toilet.mapper';

export class ToiletRepositoryImpl implements ToiletRepository {

    constructor(
        @InjectRepository(toilets)
        private toiletsRepository : Repository<toilets>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
    ){};

    async getAllToilets(): Promise<Toilet[]> {
        throw new Error('Method not implemented.');
    };

    async getToiletById(toiletId: number): Promise<Toilet> {
        const toilet_entity = await this.toiletsRepository.findOneBy({id: toiletId});
        const location_entity = await this.locationRepository.findOneBy({id: toilet_entity.location_});
        return mapToiletEntityToModel(toilet_entity, location_entity.longitude, location_entity.latitude);
    };

    async createToilet(toilet: Toilet): Promise<Toilet> {
        const location_entity = mapFacilityLocationToEntity(toilet);
        await this.locationRepository.save(location_entity);
        const toilet_entity = mapToiletModelToEntity(toilet, location_entity.id);
        const createdToilet = await this.toiletsRepository.save(toilet_entity);
        toilet.setId(createdToilet.id);
        return toilet;
    };

    async editToilet(toilet: Toilet): Promise<Toilet> {
        const location_entity = mapFacilityLocationToEntity(toilet);
        await this.locationRepository.save(location_entity);
        const toilet_entity = mapToiletModelToEntity(toilet, location_entity.id);
        const editedToilet = await this.toiletsRepository.save(toilet_entity);
        toilet.setId(editedToilet.id);
        return toilet;
    };

    async deleteToilet(toiletId: number): Promise<void> {
        await this.toiletsRepository.delete(toiletId);
    };
    
};