import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from 'src/domain/models/band/band.model';
import { bands } from '../entities/bands.entity';
import { BandRepository } from 'src/domain/repositories/band/band.repository';
import { mapBandEntityToModel, mapBandModelToEntity, mapBandPubliDetailsToEntity, mapBandBannerToEntity, mapBandThumbnailToEntity, mapBandPubliDetailsToEntityEdit } from './mappers/bands.mapper';
import { publication_details } from '../entities/publication_details.entity';
import { images } from '../entities/images.entity';
import { users } from '../entities/users.entity';

export class BandRepositoryImpl implements BandRepository {

    constructor(
        @InjectRepository(bands)
        private bandRepository: Repository<bands>,
        private publicationDetailsRepository: Repository<publication_details>,
        private imageRepository: Repository<images>,
        private userRepository: Repository<users>
    ){};
    
    
    async getAllBands(): Promise<Band[]> {
        const allBands = await this.bandRepository.find();
        const mappedBandsPromises = allBands.map(async band_entity => {
            const [thumbnail_image, banner_image, publication_details] = await Promise.all([
                this.imageRepository.findOneBy({ id: band_entity.thumbnail__image_ }),
                this.imageRepository.findOneBy({ id: band_entity.banner__image_ }),
                this.publicationDetailsRepository.findOneBy({ id: band_entity.publication__details_ }),
            ]);
            const user = await this.userRepository.findOneBy({id: publication_details.author_})
            return await mapBandEntityToModel(band_entity, thumbnail_image.image, banner_image.image, publication_details, user);
        });
        return Promise.all(mappedBandsPromises);
    };


    async getBandById(bandId: number): Promise<Band> {
        const band_entity = await this.bandRepository.findOneBy({id: bandId});
        const [thumbnail_image, banner_image, publication_details] = await Promise.all([
            this.imageRepository.findOneBy({ id: band_entity.thumbnail__image_ }),
            this.imageRepository.findOneBy({ id: band_entity.banner__image_ }),
            this.publicationDetailsRepository.findOneBy({ id: band_entity.publication__details_ }),
        ]);
        const user = await this.userRepository.findOneBy({id: publication_details.author_})
        return await mapBandEntityToModel(band_entity, thumbnail_image.image, banner_image.image, publication_details, user);
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
        band.setId(bandEntity.id);
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