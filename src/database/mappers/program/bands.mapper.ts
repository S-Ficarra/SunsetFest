import { bands } from "../../../database/entities/bands.entity"
import { images } from "../../../database/entities/images.entity";
import { publication_details } from "../../../database/entities/publication_details.entity"
import { users } from "../../../database/entities/users.entity";
import { Band } from "../../../domain/models/band/band.model"
import { Socials } from "../../../domain/models/band/socials.model"
import { User } from "../../../domain/models/user/user.model";


export function mapBandEntityToModel (band_entity: bands, thumbnail_image: Buffer, banner_image: Buffer, publication_details: publication_details, user: users): Band {


    const bandUser = new User (
        user.name,
        user.first_name,
        user.email,
        user.password,
        user.role
    );
    bandUser.setId(user.id);

    const socials = new Socials (
        band_entity.facebook,
        band_entity.instagram,
        band_entity.twitter,
        band_entity.youtube,
        band_entity.spotify,
        band_entity.website,
        band_entity.spotify_integration,
        band_entity.youtube_integration,
    );

    const band = new Band (
        band_entity.name,
        band_entity.country,
        band_entity.text,
        socials,
        thumbnail_image,
        banner_image,
        bandUser,
        publication_details.created_at,
        publication_details.modified_at,
    );

    band.setId(band_entity.id);    
    return band;
};

export function mapBandModelToEntity (model: Band, PublicationDetails: publication_details, ThumbnailImage: images, BannerImage : images): bands {

    const entity = new bands();
    entity.name = model.getName();
    entity.country = model.getCountry();
    entity.text = model.getText();
    entity.facebook = model.getSocials().getFacebook();
    entity.instagram = model.getSocials().getInstagram();
    entity.twitter = model.getSocials().getTwitter();
    entity.youtube = model.getSocials().getYoutube();
    entity.spotify = model.getSocials().getSpotify();
    entity.website = model.getSocials().getWebsite();
    entity.spotify_integration = model.getSocials().getSpotifyIntegration();
    entity.youtube_integration = model.getSocials().getYoutubeIntegration();
    entity.thumbnail__image_ = ThumbnailImage;
    entity.banner__image_ = BannerImage;
    entity.publication__details_ = PublicationDetails;
    
    return entity;
};


export function mapBandModelToEntityEdit (id: number, model: Band, PublicationDetails: publication_details, ThumbnailImage: images, BannerImage : images): bands {

    const entity = new bands();
    entity.id = id
    entity.name = model.getName();
    entity.country = model.getCountry();
    entity.text = model.getText();
    entity.facebook = model.getSocials().getFacebook();
    entity.instagram = model.getSocials().getInstagram();
    entity.twitter = model.getSocials().getTwitter();
    entity.youtube = model.getSocials().getYoutube();
    entity.spotify = model.getSocials().getSpotify();
    entity.website = model.getSocials().getWebsite();
    entity.spotify_integration = model.getSocials().getSpotifyIntegration();
    entity.youtube_integration = model.getSocials().getYoutubeIntegration();
    entity.thumbnail__image_ = ThumbnailImage;
    entity.banner__image_ = BannerImage;
    entity.publication__details_ = PublicationDetails;
    
    return entity;
};


export function mapBandPubliDetailsToEntity (model: Band): publication_details{
    const entity = new publication_details();
    entity.author_ = model.getAuthor().getId();
    entity.created_at = new Date();
    entity.modified_at = new Date();
    return entity;
};

export function mapBandPubliDetailsToEntityEdit (model: Band, publiId: number): publication_details{
    const entity = new publication_details();
    entity.id = publiId;
    entity.author_ = model.getAuthor().getId();
    entity.created_at = model.getCreatedAt();
    entity.modified_at = new Date();
    return entity;
};

export function mapBandBannerToEntity (model: Band): images{
    const entity = new images();
    entity.image = model.getBannerImage();
    return entity;
};

export function mapBandBannerToEntityEdit (model: Band, bannerId : number): images{
    const entity = new images();
    entity.id = bannerId;
    entity.image = model.getBannerImage();
    return entity;
};

export function mapBandThumbnailToEntity (model: Band): images{
    const entity = new images();
    entity.image = model.getThumbnailImage();
    return entity;
};

export function mapBandThumbnailToEntityEdit (model: Band, thumbnailId: number): images{
    const entity = new images();
    entity.id = thumbnailId;
    entity.image = model.getThumbnailImage();
    return entity;
};


