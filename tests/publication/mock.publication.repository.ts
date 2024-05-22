import { Publication } from "../../src/domain/models/publication/publication.model";
import { PublicationRepository } from "../../src/domain/repositories/publication/publication.repository";
import { User } from "../../src/domain/models/user/user.model";
import { Role } from "../../src/domain/models/user/role.model";


export class MockPublicationRepository implements PublicationRepository {

    author1 = new User(1, 'John', 'Doe', 'john@example.com', 'password', new Role(1, 'Author'));
    author2 = new User(2, 'Jane', 'Doe', 'jane@example.com', 'password', new Role(2, 'Editor'));

    private publications: Publication[] = [
        new Publication (1, this.author1, new Date(), new Date(), false),
        new Publication (2, this.author2, new Date(), new Date(), true)
    ];

    getAllPublication(): Publication[] {
        return this.publications;
    };

    getPublicationById(publicationId: number): Publication | undefined {
        return this.publications.find(publication => publication.getId() === publicationId);
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