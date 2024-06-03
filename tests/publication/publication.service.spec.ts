import { Publication } from "../../src/domain/models/publication/publication.model";
import { PublicationService } from "../../src/services/publication/publication.service";
import { MockPublicationRepository } from "./mockRepositories/mock.publication.repository";
import { RoleService } from "../../src/services/user/role.service";
import { MockUserRepository } from "../user/mock.user.repository";

 
describe('PublicationService', () => {
    let userRepository : MockUserRepository;
    let roleService: RoleService;
    let publicationService: PublicationService;
    let publicationRepository: MockPublicationRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository();
        publicationRepository = new MockPublicationRepository(userRepository);
        roleService = new RoleService();
        publicationService = new PublicationService(publicationRepository, roleService);
        userRepository.setFakeIdToTest();
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
        const foundPublication = publicationService.createPublication(new Publication(userRepository.users[0],new Date(), new Date(), false,'information'));
        expect(foundPublication).toEqual(expect.objectContaining({ _type: 'information', _status: false, _user: (expect.objectContaining({ _id: 1}))}));
    });

    //editPublication
    it('should return the publication edited with the modification', () => {
        const editedPublication = new Publication(userRepository.users[1], new Date(), new Date(), true,'faq');
        editedPublication.setId(1)
        const editedPublicationFounded = publicationService.editPublication(editedPublication);
        expect(editedPublicationFounded).toEqual(expect.objectContaining({ _type: 'faq', _status: true}));
    });

    //deletePublication by an editor or admin
    it('should delete the publication with the id 1', () => {
        publicationService.deletePublication(userRepository.users[1], 1);        
        const publications = publicationService.getAllPublication();
        expect(publications).toHaveLength(1);
        expect(publications.some(publication => publication.getId() === 1)).toBeFalsy();
    });

    //deletePublication by an author
    it('should delete the publication with the id 1', () => {
        const deletePublicatonCall = () => publicationService.deletePublication(userRepository.users[0], 1);        
        expect(deletePublicatonCall).toThrow(Error);
    });


    //changeStatus by an editor
    it ('Should change the status of the publication Id1 from false to true', () => {
        publicationService.changeStatus(userRepository.users[1],1,true);
        expect(publicationService.getPublicationById(1)).toEqual(expect.objectContaining({ _status: true}));
    });

    //changeStatus by an author
    it ('Should change the status of the publication Id1 from false to true', () => {
        const changeStatusCall = () => publicationService.changeStatus(userRepository.users[0],1,true);
        expect(changeStatusCall).toThrow(Error);
    });

});