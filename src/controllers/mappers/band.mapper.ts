import { Band } from "src/domain/models/band/band.model";
import { BandDto } from "../DTO/band.dto";
import { Socials } from "src/domain/models/band/socials.model";
import { User } from "src/domain/models/user/user.model";

export function mapBandDtoToModelCreate (bandDto : BandDto, thumbnailImage: Buffer, bannerImage: Buffer, user: User): Band {

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
        thumbnailImage,
        bannerImage,
        user,
        new Date(),
        new Date ()        
    );
    return band
};


export function mapBandDtoToModelEdit (bandToEdit: Band, bandDto : BandDto, thumbnailImage: Buffer, bannerImage: Buffer, user: User): Band {

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
    bandToEdit.setThumbnailImage(thumbnailImage);
    bandToEdit.setBannerImage(bannerImage)
    bandToEdit.setAuthor(user);
    bandToEdit.setModifiedAt(new Date())    

    return bandToEdit;
};
