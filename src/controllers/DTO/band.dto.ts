import { IsString, IsUrl } from "class-validator";

export class BandDto {
    @IsString()
    name: string;
  
    @IsString()
    country: string;
  
    @IsString()
    text: string;

    @IsUrl()
    facebook: string;

    @IsUrl()
    instagram: string;

    @IsUrl()
    twitter: string;

    @IsUrl()
    youtube: string;

    @IsUrl()
    spotify: string;

    @IsUrl()
    website: string;

    @IsString()
    spotifyIntegration: string;

    @IsString()
    youtubeIntegration: string;
  
};