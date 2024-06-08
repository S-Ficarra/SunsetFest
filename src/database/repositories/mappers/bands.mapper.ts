import { bands } from "src/database/entities/bands.entity"
import { images } from "src/database/entities/images.entity";
import { publication_details } from "src/database/entities/publication_details.entity"
import { users } from "src/database/entities/users.entity";
import { Band } from "src/domain/models/band/band.model"
import { Socials } from "src/domain/models/band/socials.model"
import { User } from "src/domain/models/user/user.model";


export async function mapBandEntityToModel (band_entity: bands, thumbnail_image: Blob, banner_image: Blob, publication_details: publication_details, user: users): Promise<Band> {


    const bandUser = new User (
        user.name,
        user.first_name,
        user.email,
        user.password,
        user.role
    )
    bandUser.setId(user.id)

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

    band.setId(band_entity.id)
    return band;
};



export async function mapBandModelToEntity (model: Band, fkPublicationDetails: number, fkThumbnailImage: number, fkBannerImage : number): Promise<bands> {

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
    entity.thumbnail__image_ = fkThumbnailImage;
    entity.banner__image_ = fkBannerImage;
    entity.publication__details_ = fkPublicationDetails;
    
    return entity;
};


export async function mapBandPubliDetailsToEntity (model: Band): Promise<publication_details>{
    const entity = new publication_details();
    entity.author_ = model.getAuthorId().getId(),
    entity.created_at = new Date();
    entity.modified_at = new Date();
    return entity;
};

export async function mapBandPubliDetailsToEntityEdit (model: Band): Promise<publication_details>{
    const entity = new publication_details();
    entity.author_ = model.getAuthorId().getId(),
    entity.created_at = model.getCreatedAt();
    entity.modified_at = new Date();
    return entity;
};


export async function mapBandBannerToEntity (model: Band): Promise<images>{
    const entity = new images();
    entity.image = model.getBannerImage();
    return entity;
};

export async function mapBandThumbnailToEntity (model: Band): Promise<images>{
    const entity = new images();
    entity.image = model.getThumbnailImage();
    return entity;
};


