import { Publication } from "../../src/domain/models/publication/publication.model";
import { PublicationRepository } from "../../src/domain/repositories/publication/publication.repository";


export class MockPublicationRepository implements PublicationRepository {

    

    public publications: Publication[] = [
        new Publication (55, new Date(), new Date(), false, 'news'),
        new Publication (44, new Date(), new Date(), true, 'news')
    ];

    setFakeIdToTest(): void {
        this.publications[0].setId(1)
        this.publications[1].setId(2)
    };

    getAllPublication(): Publication[] {
        return this.publications;
    };

    getPublicationById(publicationId: number): Publication | undefined {
        return this.publications[publicationId -1];
    };

    createPublication(publication: Publication): void {
        this.publications.push(publication);
    };

    editPublication(publication: Publication): void {
        let publicationid = publication.getId();
        this.publications[publicationid - 1] = publication;
    };

    deletePublication(publicationId: number): void {
        this.publications = this.publications.filter(publication => publication.getId() !== publicationId);
    };

};