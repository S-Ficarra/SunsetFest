import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Toilet } from 'src/domain/models/facility/toilet.model';
import { toilets } from '../../entities/toilets.entity';
import { locations } from '../../entities/locations.entity';
import { ToiletRepository } from 'src/domain/repositories/facility/toilet.repository';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit } from '../../mappers/facility/facility.mapper';
import { mapToiletEntityToModel, mapToiletModelToEntity, mapToiletModelToEntityEdit } from '../../mappers/facility/toilet.mapper';
import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';

@Injectable()
export class ToiletRepositoryImpl implements ToiletRepository {

    constructor(
        @InjectRepository(toilets)
        private toiletsRepository : Repository<toilets>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
    ){};

    async getAllToilets(): Promise<Toilet[]> {
        const allToilet = await this.toiletsRepository.find();
        const mappedToiletPromises = allToilet.map(async toilet_entity => {
            const location_entity = await this.locationRepository.findOneBy({id: toilet_entity.location_.id});
            return mapToiletEntityToModel(toilet_entity, location_entity.longitude, location_entity.latitude);
        });
        return Promise.all(mappedToiletPromises);
    };

    async getToiletById(toiletId: number): Promise<Toilet> {
        const toilet_entity = await this.toiletsRepository.findOneBy({id: toiletId});             
        if (toilet_entity) {
            const location_entity = await this.locationRepository.findOneBy({id: toilet_entity.location_.id});
            return mapToiletEntityToModel(toilet_entity, location_entity.longitude, location_entity.latitude);            
        };   
        return null;
    };

    async createToilet(toilet: Toilet): Promise<Toilet> {
        const location_entity = mapFacilityLocationToEntity(toilet);
        await this.locationRepository.save(location_entity);
        const toilet_entity = mapToiletModelToEntity(toilet, location_entity);
        const createdToilet = await this.toiletsRepository.save(toilet_entity);
        toilet.setId(createdToilet.id);
        return toilet;
    };

    async editToilet(toilet: Toilet): Promise<Toilet> {
        const toilet_entity = await this.toiletsRepository.findOneBy({id: toilet.getId()})
        const location_entity =  mapFacilityLocationToEntityEdit(toilet, toilet_entity.location_.id);
        await this.locationRepository.save(location_entity);
        const toiletEditedToSave = mapToiletModelToEntityEdit(toilet, location_entity);
        const editedToilet = await this.toiletsRepository.save(toiletEditedToSave);
        toilet.setId(editedToilet.id);
        return toilet;
    };

    async deleteToilet(toiletId: number): Promise<void> {
        const toilet_entity = await this.toiletsRepository.findOneBy({id : toiletId})
        const location_entity = await this.locationRepository.findOneBy({id: toilet_entity.location_.id})
        
        await this.locationRepository.delete(location_entity.id)
        await this.toiletsRepository.delete(toiletId);
    };
    
};