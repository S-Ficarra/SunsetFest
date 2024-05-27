import { Publication } from "../../src/domain/models/publication/publication.model";
import { PublicationService } from "../../src/services/publication/publication.service";
import { MockPublicationRepository } from "./mockRepositories/mock.publication.repository";

 
describe('PublicationService', () => {
    let publicationService: PublicationService;
    let publicationRepository: MockPublicationRepository;

    beforeEach(() => {
        publicationRepository = new MockPublicationRepository();
        publicationService = new PublicationService(publicationRepository);
        publicationRepository.setFakeIdToTest();
    });

    //getPublicationById
    it("Sould return a publication by it's id", () => {
        const foundPublication1 = publicationService.getPublicationById(1);
        expect(foundPublication1).toEqual(expect.objectContaining({ _id: 1, _status: false}));
    });

    //getAllPublication
    it('should return all publication', () => {
        const publications = publicationService.getAllPublication();
        expect(publications).toHaveLength(2);
        expect(publications).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'news', _status: false}),
            expect.objectContaining({_type: 'news', _status: true}),
        ])); 
    });

    //createPublication
    it('should return a publication just created', () => {
        const foundPublication = publicationService.createPublication(new Publication(3,new Date(), new Date(), false,'information'));
        expect(foundPublication).toEqual(expect.objectContaining({ _type: 'information', _userId: 3}));
    });

    //editPublication
    it('should return the publication edited with the modification', () => {
        const editedPublication = new Publication(3, new Date(), new Date(), true,'faq');
        editedPublication.setId(1)
        const editedPublicationFounded = publicationService.editPublication(editedPublication);
        expect(editedPublicationFounded).toEqual(expect.objectContaining({ _type: 'faq', _status: true}));
    });

    //deletePublicatio 
    it('should delete the publication with the id 1', () => {
        publicationService.deletePublication(1);
        const publications = publicationService.getAllPublication();
        expect(publications).toHaveLength(1);
        expect(publications.some(publication => publication.getId() === 1)).toBeFalsy();
    });

});