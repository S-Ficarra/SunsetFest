import { Publication } from "../../src/domain/models/publication/publication.model";
import { PublicationService } from "../../src/services/publication/publication.service";
import { MockPublicationRepository } from "./mock.publication.repository";
import { User } from "../../src/domain/models/user/user.model";
import { Role } from "../../src/domain/models/user/role.model";

let author3 = new User(3, 'Dev', 'Hill', 'Dev@example.com', 'password', new Role(3, 'Administrator'));
 
describe('PublicationService', () => {
    let publicationService: PublicationService;
    let publicationRepository: MockPublicationRepository;

    beforeEach(() => {
        publicationRepository = new MockPublicationRepository();
        publicationService = new PublicationService(publicationRepository);
    });

    //getPublicationById
    it("Sould return a publication by it's id", () => {
        const foundPublication1 = publicationService.getPublicationById(1);
        expect(foundPublication1).toEqual(expect.objectContaining({ _id: 1, _authorId: expect.objectContaining({ _id: 1 }) }));
    });

    //getAllPublication
    it('should return all publication', () => {
        const publications = publicationRepository.getAllPublication();
        expect(publications).toHaveLength(2);
        expect(publications).toEqual(expect.arrayContaining([
            expect.objectContaining({_id: 1, _authorId: expect.objectContaining({ _id: 1 }) }),
            expect.objectContaining({_id: 2, _authorId: expect.objectContaining({ _id: 2 }) }),
        ])); 
    });

    //createPublication
    it('should return a publication just created', () => {
        publicationService.createPublication(new Publication(3, author3,new Date(), new Date(), false));
        const foundPublication = publicationService.getPublicationById(3);
        expect(foundPublication).toEqual(expect.objectContaining({ _id: 3, _authorId: expect.objectContaining({ _id: 3 }) }));
    });

    //editPublication
    it('should return the publication edited with the modification', () => {
        const editedPublication = new Publication(1, author3, new Date(), new Date(), true);
        publicationService.editPublication(editedPublication);
        const editedPublicationFounded = publicationService.getPublicationById(1)
        expect(editedPublicationFounded).toEqual(expect.objectContaining({ _id: 1, _authorId: expect.objectContaining({ _id: 3 }) }));
    });

    //deletePublicatio 
    it('should delete the publication with the id 1', () => {
        publicationService.deletePublication(1);
        const publications = publicationRepository.getAllPublication();
        expect(publications).toHaveLength(1);
        expect(publications.some(publication => publication.getId() === 1)).toBeFalsy();
    });

});