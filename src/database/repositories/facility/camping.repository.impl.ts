import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Camping } from 'src/domain/models/facility/camping.model';
import { campings } from '../../entities/campings.entity';
import { locations } from '../../entities/locations.entity';
import { CampingRepository } from 'src/domain/repositories/facility/camping.repository';
import { mapFacilityLocationToEntity } from '../../mappers/facility/facility.mapper';
import { mapCampingEntityToModel, mapCampingModelToEntity } from '../../mappers/facility/camping.mapper';


export class CampingRepositoryImpl implements CampingRepository {

    constructor(
        @InjectRepository(campings)
        private campingRepository : Repository<campings>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
    ){};


    async getAllCampings(): Promise<Camping[]> {
        const allCampings = await this.campingRepository.find()
        const mappedCampingsPromises = allCampings.map( async camping_entity => {
            const location_entity = await this.locationRepository.findOneBy({id: camping_entity.location_});
            return mapCampingEntityToModel(camping_entity, location_entity.longitude, location_entity.latitude);
        });
        return Promise.all(mappedCampingsPromises);
    };

    async getCampingById(campingId: number): Promise<Camping> {
        const camping_entity = await this.campingRepository.findOneBy({id: campingId});
        const camping_location = await this.locationRepository.findOneBy({id: camping_entity.location_});
        return mapCampingEntityToModel(camping_entity, camping_location.longitude, camping_location.latitude);    
    };


    async createCamping(camping: Camping): Promise<Camping> {
        const location_entity = mapFacilityLocationToEntity(camping);
        await this.locationRepository.save(location_entity);
        const camping_entity = mapCampingModelToEntity(camping, location_entity.id);
        const createdCamping = await this.campingRepository.save(camping_entity);
        camping.setId(createdCamping.id);
        return camping;
    };


    async editCamping(camping: Camping): Promise<Camping> {
        const location_entity = mapFacilityLocationToEntity(camping);
        await this.locationRepository.save(location_entity);
        const camping_entity = mapCampingModelToEntity(camping, location_entity.id);
        const editedCamping = await this.campingRepository.save(camping_entity);
        camping.setId(editedCamping.id);
        return camping;;
    };

    
    async deleteCamping(campingId: number): Promise<void> {
        await this.campingRepository.delete(campingId);
    };
    
};