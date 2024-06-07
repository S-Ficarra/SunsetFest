import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from 'src/domain/models/band/band.model';
import { bands } from '../entities/bands.entity';
import { BandRepository } from 'src/domain/repositories/band/band.repository';
import { mapBandEntityToModel, mapBandModelToEntity, mapBandPubliDetailsToEntity, mapBandBannerToEntity, mapBandThumbnailToEntity, mapBandPubliDetailsToEntityEdit } from './mappers/bands.mapper';
import { publication_details } from '../entities/publication_details.entity';
import { images } from '../entities/images.entity';

export class BandRepositoryImpl implements BandRepository {

    constructor(
        @InjectRepository(bands)
        private bandRepository: Repository<bands>,
        private publicationDetailsRepository: Repository<publication_details>,
        private imageRepository: Repository<images>,
    ){};
    
    
    async getAllBands(): Promise<Band[]> {
        const allBands = await this.bandRepository.find();
        const mappedBandsPromises = allBands.map(async band_entity => {
            return await mapBandEntityToModel(band_entity);
        });
        return Promise.all(mappedBandsPromises);
    };


    async getBandById(bandId: number): Promise<Band> {
        const band_entity = await this.bandRepository.findOneBy({id: bandId});
        return await mapBandEntityToModel(band_entity);
    };


    async createBand(band: Band): Promise<Band> {
        const publicationDetailsEntity = await mapBandPubliDetailsToEntity(band);
        await this.publicationDetailsRepository.save(publicationDetailsEntity);
        const bannerImageEntity = await mapBandBannerToEntity(band);
        const thumbnailImageEntity = await mapBandThumbnailToEntity(band)
        await this.imageRepository.save(bannerImageEntity);
        await this.imageRepository.save(thumbnailImageEntity);
        const bandEntity = await mapBandModelToEntity(band, publicationDetailsEntity.id, bannerImageEntity.id, thumbnailImageEntity.id);
        await this.bandRepository.save(bandEntity);
        return band;
    };


    async editBand(band: Band): Promise<Band> {
        const publicationDetailsEntity = await mapBandPubliDetailsToEntityEdit(band);
        await this.publicationDetailsRepository.save(publicationDetailsEntity);
        const bannerImageEntity = await mapBandBannerToEntity(band);
        const thumbnailImageEntity = await mapBandThumbnailToEntity(band)
        await this.imageRepository.save(bannerImageEntity);
        await this.imageRepository.save(thumbnailImageEntity);
        const bandEntity = await mapBandModelToEntity(band, publicationDetailsEntity.id, bannerImageEntity.id, thumbnailImageEntity.id);
        await this.bandRepository.save(bandEntity);
        return band;;
    };


    async deleteBand(bandId: number): Promise<void> {
        this.bandRepository.delete(bandId);
    };



};