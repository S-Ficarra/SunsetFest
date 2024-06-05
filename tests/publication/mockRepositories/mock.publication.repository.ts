import { MockUserRepository } from "../../user/mock.user.repository";
import { Publication } from "../../../src/domain/models/publication/publication.model";
import { PublicationRepository } from "../../../src/domain/repositories/publication/publication.repository";


export class MockPublicationRepository implements PublicationRepository {

    public userRepository : MockUserRepository;
    public publications: Publication[] = [];

    constructor(userRepository : MockUserRepository){
        this.userRepository = userRepository
        userRepository.setFakeIdToTest()
        this.initializePublications();
    }

    private initializePublications(): void {
        this.publications.push(
            new Publication (this.userRepository.users[0], new Date(), new Date(), false, 'news'),
            new Publication (this.userRepository.users[1], new Date(), new Date(), true, 'news')
        );
    };


    setFakeIdToTest(): void {
        this.publications[0].setId(1)
        this.publications[1].setId(2)
    };

    async getAllPublication(): Promise<Publication[]> {
        return this.publications;
    };

    async getPublicationById(publicationId: number): Promise<Publication> {
        return this.publications[publicationId -1];
    };

    async createPublication(publication: Publication): Promise<Publication> {
        publication.setId(this.publications.length + 1)        
        this.publications.push(publication);
        return publication;
    };

    async editPublication(publication: Publication): Promise<Publication> {
        let publicationid = publication.getId();
        this.publications[publicationid - 1] = publication;
        return publication;
    };

    async deletePublication(publicationId: number): Promise<void> {
        this.publications = this.publications.filter(publication => publication.getId() !== publicationId);
    };

};