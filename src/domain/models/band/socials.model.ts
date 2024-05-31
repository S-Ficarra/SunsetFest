export class Socials {

    private _id : number
    private _facebook: string;
    private _instagram: string;
    private _twitter: string;
    private _youtube: string;
    private _spotify: string;
    private _website: string;
    private _spotifyIntegrationLink: string;
    private _youtubeIntegrationLink: string;

    constructor(facebook: string, instagram: string, twitter: string, youtube: string, spotify: string, website: string, spotifyIntegrationLink: string, youtubeIntegrationLink: string) {
        this._facebook = facebook;
        this._instagram = instagram;
        this._twitter = twitter;
        this._youtube = youtube;
        this._spotify = spotify;
        this._website = website;
        this._spotifyIntegrationLink = spotifyIntegrationLink;
        this._youtubeIntegrationLink = youtubeIntegrationLink;
    };

    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }

    setFacebook(facebookLink: string) {
        this._facebook = facebookLink;
    }

    getFacebook(): string {
        return this._facebook;
    }

    setInstagram(InstagramLink: string) {
        this._instagram = InstagramLink;
    }

    getInstagram(): string {
        return this._instagram;
    }

    setTwitter(twitterLink: string) {
        this._twitter = twitterLink;
    }

    getTwitter(): string {
        return this._twitter;
    }

    setYoutube(youtubeLink: string) {
        this._youtube = youtubeLink;
    }

    getYoutube(): string {
        return this._youtube;
    }

    setSpotify(spotifyLink: string) {
        this._spotify = spotifyLink;
    }

    getSpotify(): string {
        return this._spotify;
    }

    setWebsite(websiteLink: string) {
        this._website = websiteLink;
    }

    getWebsite(): string {
        return this._website;
    }

    setSpotifyIntegration(spotifyIntegrationlink: string) {
        this._spotifyIntegrationLink = spotifyIntegrationlink;
    }

    getSpotifyIntegration(): string {
        return this._spotifyIntegrationLink;
    }

    setYoutubeIntegration(youtubeIntegrationlink: string) {
        this._youtubeIntegrationLink = youtubeIntegrationlink;
    }

    getYoutubeIntegration(): string {
        return this._youtubeIntegrationLink;
    }


}