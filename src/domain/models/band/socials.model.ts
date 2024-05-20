export class Socials {

    public facebook: string;
    public instagram: string;
    public twitter: string;
    public youtube: string;
    public spotify: string;
    public website: string;
    public spotifyIntegrationLink: string;
    public youtubeIntegrationLink: string;

    constructor(facebook: string, instagram: string, twitter: string, youtube: string, spotify: string, website: string, spotifyIntegrationLink: string, youtubeIntegrationLink: string) {
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
        this.youtube = youtube;
        this.spotify = spotify;
        this.website = website;
        this.spotifyIntegrationLink = spotifyIntegrationLink;
        this.youtubeIntegrationLink = youtubeIntegrationLink;
    };

    setFacebook(facebookLink: string) {
        this.facebook = facebookLink;
    }

    getFacebook(): string {
        return this.facebook;
    }

    setInstagram(InstagramLink: string) {
        this.instagram = InstagramLink;
    }

    getInstagram(): string {
        return this.instagram;
    }

    setTwitter(twitterLink: string) {
        this.twitter = twitterLink;
    }

    getTwitter(): string {
        return this.twitter;
    }

    setYoutube(youtubeLink: string) {
        this.youtube = youtubeLink;
    }

    getYoutube(): string {
        return this.youtube;
    }

    setSpotify(spotifyLink: string) {
        this.spotify = spotifyLink;
    }

    getSpotify(): string {
        return this.spotify;
    }

    setWebsite(websiteLink: string) {
        this.website = websiteLink;
    }

    getWebsite(): string {
        return this.website;
    }

    setSpotifyIntegration(spotifyIntegrationlink: string) {
        this.spotifyIntegrationLink = spotifyIntegrationlink;
    }

    getSpotifyIntegration(): string {
        return this.spotifyIntegrationLink;
    }

    setYoutubeIntegration(youtubeIntegrationlink: string) {
        this.youtubeIntegrationLink = youtubeIntegrationlink;
    }

    getYoutubeIntegration(): string {
        return this.youtubeIntegrationLink;
    }


}