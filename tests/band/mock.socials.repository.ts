import { Socials } from "../../src/domain/models/band/socials.model";
import { SocialsRepository } from "../../src/domain/repositories/band/socials.repository";

export class MockSocialsRepository implements SocialsRepository {


    public socials: Socials[] = [
        new Socials ('facebook1', 'instagram1', 'twitter1', 'youtube1', 'spotify1', 'website1', 'integrationSpotify1', 'integrationYoutube1'),
        new Socials ('facebook2', 'instagram2', 'twitter2', 'youtube2', 'spotify2', 'website2', 'integrationSpotify2', 'integrationYoutube2'),    
    ];

    setFakeIdToTest(): void {
        this.socials[0].setId(1)
        this.socials[1].setId(2)
    };


    getAllSocials(): Socials[] {
        return this.socials;
    };

    getSocialsById(socialsId: number): Socials {
        return this.socials[socialsId - 1];
    };

    createSocials(socials: Socials): void {
        this.socials.push(socials);
    };

    editSocials(socials: Socials): void {
        let socialsId = socials.getId();
        this.socials[socialsId - 1] = socials;
    };
    
    deleteSocials(socialsId: number): void {
        this.socials = this.socials.filter(socials => socials.getId() !== socialsId);
    };













}