import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from 'src/domain/models/band/band.model';
import { bands } from '../../entities/bands.entity';
import { BandRepository } from 'src/domain/repositories/band/band.repository';
import { mapBandEntityToModel, mapBandModelToEntity, mapBandPubliDetailsToEntity, mapBandBannerToEntity, mapBandThumbnailToEntity, mapBandPubliDetailsToEntityEdit, mapBandBannerToEntityEdit, mapBandThumbnailToEntityEdit, mapBandModelToEntityEdit } from '../../mappers/program/bands.mapper';
import { publication_details } from '../../entities/publication_details.entity';
import { images } from '../../entities/images.entity';
import { users } from '../../entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BandRepositoryImpl implements BandRepository {

    constructor(
        @InjectRepository(bands)
        private bandRepository: Repository<bands>,
        @InjectRepository(publication_details)
        private publicationDetailsRepository: Repository<publication_details>,
        @InjectRepository(images)
        private imageRepository: Repository<images>,
        @InjectRepository(users)
        private userRepository: Repository<users>
    ){};
    
    async getAllBands(): Promise<Band[]> {
        const allBands = await this.bandRepository.find();
        const mappedBandsPromises = allBands.map(async band_entity => {
            const thumbnail_image = band_entity.thumbnail__image_.image
            const banner_image = band_entity.banner__image_.image
            const publication_details = band_entity.publication__details_
            const user = await this.userRepository.findOneBy({id: publication_details.author_})
            return mapBandEntityToModel(band_entity, thumbnail_image, banner_image, publication_details, user);
        });
        return Promise.all(mappedBandsPromises);
    };

    async getBandById(bandId: number): Promise<Band> {
        const band_entity = await this.bandRepository.findOne({where: {id: bandId}});
        if (band_entity) {
            const thumbnail_image = band_entity.thumbnail__image_.image
            const banner_image = band_entity.banner__image_.image
            const publication_details = band_entity.publication__details_
            const user = await this.userRepository.findOneBy({id: publication_details.author_})
            return mapBandEntityToModel(band_entity, thumbnail_image, banner_image, publication_details, user);
        } 
        throw new Error ('Band do not exist');
    };

    async getBandByName(name: string): Promise <Band> {
        const band_entity = await this.bandRepository.findOneBy({name: name});
        if (band_entity) {
            const thumbnail_image = band_entity.thumbnail__image_.image
            const banner_image = band_entity.banner__image_.image
            const publication_details = band_entity.publication__details_
            const user = await this.userRepository.findOneBy({id: publication_details.author_})
            return mapBandEntityToModel(band_entity, thumbnail_image, banner_image, publication_details, user);
        };
    };

    async createBand(band: Band): Promise<Band> {
        const publicationDetailsEntity = mapBandPubliDetailsToEntity(band);
        await this.publicationDetailsRepository.save(publicationDetailsEntity);
        const bannerImageEntity = mapBandBannerToEntity(band);
        const thumbnailImageEntity = mapBandThumbnailToEntity(band)
        await this.imageRepository.save(bannerImageEntity);
        await this.imageRepository.save(thumbnailImageEntity);
        const bandEntity = mapBandModelToEntity(band, publicationDetailsEntity, bannerImageEntity, thumbnailImageEntity);
        await this.bandRepository.save(bandEntity);
        band.setId(bandEntity.id);      
        return band;
    };

    async editBand(band: Band): Promise<Band> {
        const band_entity = await this.bandRepository.findOneBy({id : band.getId()})

        const publicationDetailsEntity = mapBandPubliDetailsToEntityEdit(band, band_entity.publication__details_.id);
        await this.publicationDetailsRepository.save(publicationDetailsEntity);
        const bannerImageEntity = mapBandBannerToEntityEdit(band, band_entity.banner__image_.id);
        const thumbnailImageEntity = mapBandThumbnailToEntityEdit(band, band_entity.thumbnail__image_.id)
        await this.imageRepository.save(bannerImageEntity);
        await this.imageRepository.save(thumbnailImageEntity);

        const bandEntity = mapBandModelToEntityEdit(band_entity.id, band, publicationDetailsEntity, bannerImageEntity, thumbnailImageEntity);

        await this.bandRepository.save(bandEntity);
        return band;;
    };

    async deleteBand(bandId: number): Promise<void> {
        const bandToDelete = await this.bandRepository.findOneBy({id: bandId});
        
        const thumbnailToDelete = bandToDelete.thumbnail__image_
        const bannerToDelete = bandToDelete.banner__image_
        const publiToDelete = bandToDelete.publication__details_
        
        await this.imageRepository.delete(thumbnailToDelete.id)
        await this.imageRepository.delete(bannerToDelete.id)
        await this.publicationDetailsRepository.delete(publiToDelete.id)
        await this.bandRepository.delete(bandId);
    };

};