import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vip } from 'src/domain/models/facility/vip.model';
import { vips } from '../../entities/vips.entity';
import { locations } from '../../entities/locations.entity';
import { VipRepository } from 'src/domain/repositories/facility/vip.repository';
import { mapVipEntityToModel, mapVipModelToEntity } from '../../mappers/facility/vips.mapper';
import { mapFacilityLocationToEntity } from '../../mappers/facility/facility.mapper';


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
            const location_entity = await this.locationRepository.findOneBy({id: vip_entity.location_});
            return mapVipEntityToModel(vip_entity, location_entity.longitude, location_entity.latitude);
        });
        return Promise.all(mappedVipsPromises);
    };


    async getVipById(vipId: number): Promise<Vip> {
        const vip_entity = await this.vipRepository.findOneBy({id: vipId});
        const vip_location = await this.locationRepository.findOneBy({id: vip_entity.location_});
        return mapVipEntityToModel(vip_entity, vip_location.longitude, vip_location.latitude);
    };


    async createVip(vip: Vip): Promise<Vip> {
        const location_entity = mapFacilityLocationToEntity(vip);
        await this.locationRepository.save(location_entity);
        const vip_entity = mapVipModelToEntity(vip, location_entity.id);
        const createdVip = await this.vipRepository.save(vip_entity);
        vip.setId(createdVip.id)
        return vip;
    };


    async editVip(vip: Vip): Promise<Vip> {
        const location_entity = mapFacilityLocationToEntity(vip);
        await this.locationRepository.save(location_entity);
        const vip_entity = mapVipModelToEntity(vip, location_entity.id);
        const updatedVip = await this.vipRepository.save(vip_entity);
        vip.setId(updatedVip.id)
        return vip;
    };

    async deleteVip(vipId: number): Promise<void> {
        await this.vipRepository.delete(vipId);
    };

};