import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vip } from 'src/domain/models/facility/vip.model';
import { vips } from '../../entities/vips.entity';
import { locations } from '../../entities/locations.entity';
import { VipRepository } from 'src/domain/repositories/facility/vip.repository';
import { mapVipEntityToModel, mapVipModelToEntity, mapVipModelToEntityEdit } from '../../mappers/facility/vips.mapper';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit } from '../../mappers/facility/facility.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VipRepositoryImpl implements VipRepository {

    constructor(
        @InjectRepository(vips)
        private vipRepository : Repository<vips>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
    ){};


    async getAllVips(): Promise<Vip[]> {
        const allVips = await this.vipRepository.find()
        const mappedVipsPromises = allVips.map( async vip_entity => {
            if (vip_entity) {
                const vip_location = await this.locationRepository.findOneBy({id: vip_entity.location_.id});
                return mapVipEntityToModel(vip_entity, vip_location.longitude, vip_location.latitude);
            };
            return null;
        });
        return Promise.all(mappedVipsPromises);
    };


    async getVipById(vipId: number): Promise<Vip> {
        const vip_entity = await this.vipRepository.findOneBy({id: vipId});
        if (vip_entity) {
            const vip_location = await this.locationRepository.findOneBy({id: vip_entity.location_.id});
            return mapVipEntityToModel(vip_entity, vip_location.longitude, vip_location.latitude);
        };
        return null;
    };


    async createVip(vip: Vip): Promise<Vip> {
        const location_entity = mapFacilityLocationToEntity(vip);
        await this.locationRepository.save(location_entity);
        const vip_entity = mapVipModelToEntity(vip, location_entity);
        const createdVip = await this.vipRepository.save(vip_entity);
        vip.setId(createdVip.id)
        return vip;
    };


    async editVip(vip: Vip): Promise<Vip> {
        const vip_entity = await this.vipRepository.findOneBy({id: vip.getId()})
        const location_entity = mapFacilityLocationToEntityEdit(vip, vip_entity.location_.id);
        await this.locationRepository.save(location_entity);
        const mappedVipToEdit = mapVipModelToEntityEdit(vip, location_entity);        
        const updatedVip = await this.vipRepository.save(mappedVipToEdit);
        vip.setId(updatedVip.id)
        return vip;
    };

    async deleteVip(vipId: number): Promise<void> {
        const vip_entity = await this.vipRepository.findOneBy({id: vipId});
        const location = await this.locationRepository.findOneBy({id: vip_entity.location_.id});

        await this.locationRepository.delete(location.id);
        await this.vipRepository.delete(vipId);
    };

};