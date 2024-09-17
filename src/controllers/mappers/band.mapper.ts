import { Band } from "../../domain/models/band/band.model";
import { BandDto } from "../DTO/band.dto";
import { Socials } from "../../domain/models/band/socials.model";
import { User } from "../../domain/models/user/user.model";

export function mapBandDtoToModelCreate (bandDto : BandDto, thumbnailImageUrl: string, bannerImageUrl: string, user: User): Band {

    const socials = new Socials (
        bandDto.facebook,
        bandDto.instagram,
        bandDto.twitter,
        bandDto.youtube,
        bandDto.spotify,
        bandDto.website,
        bandDto.spotifyIntegration,
        bandDto.youtubeIntegration
    );

    const band = new Band(
        bandDto.name,
        bandDto.country,
        bandDto.text,
        socials,
        thumbnailImageUrl,
        bannerImageUrl,
        user,
        new Date(),
        new Date ()        
    );
    return band
};


export function mapBandDtoToModelEdit (bandToEdit: Band, bandDto : BandDto, thumbnailImageUrl: string, bannerImageUrl: string, user: User): Band {

    const socials = new Socials (
        bandDto.facebook,
        bandDto.instagram,
        bandDto.twitter,
        bandDto.youtube,
        bandDto.spotify,
        bandDto.website,
        bandDto.spotifyIntegration,
        bandDto.youtubeIntegration
    );

    bandToEdit.setName(bandDto.name);
    bandToEdit.setCountry(bandDto.country);
    bandToEdit.setText(bandDto.text)
    bandToEdit.setSocials(socials),                    
    bandToEdit.setThumbnailImageUrl(thumbnailImageUrl);
    bandToEdit.setBannerImageUrl(bannerImageUrl)
    bandToEdit.setAuthor(user);
    bandToEdit.setModifiedAt(new Date())    

    return bandToEdit;
};
