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
    it("Sould return a publication by it's id", async () => {
        const foundPublication1 = await publicationService.getPublicationById(1);
        expect(foundPublication1).toEqual(expect.objectContaining({ _id: 1, _status: false}));
    });

    //getAllPublication
    it('should return all publication', async () => {
        const publications = await publicationService.getAllPublication();
        expect(publications).toHaveLength(2);
        expect(publications).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'news', _status: false}),
            expect.objectContaining({_type: 'news', _status: true}),
        ])); 
    });

    //createPublication
    it('should return a publication just created', async () => {
        const foundPublication = await publicationService.createPublication(new Publication(userRepository.users[0],new Date(), new Date(), false,'information'));
        expect(foundPublication).toEqual(expect.objectContaining({ _type: 'information', _status: false, _user: (expect.objectContaining({ _id: 1}))}));
    });

    //editPublication
    it('should return the publication edited with the modification', async () => {
        const editedPublication = new Publication(userRepository.users[1], new Date(), new Date(), true,'faq');
        editedPublication.setId(1)
        const editedPublicationFounded = await publicationService.editPublication(editedPublication);
        expect(editedPublicationFounded).toEqual(expect.objectContaining({ _type: 'faq', _status: true}));
    });

    //deletePublication by an editor or admin
    it('should delete the publication with the id 1', async () => {
        publicationService.deletePublication(userRepository.users[1], 1);        
        const publications = await publicationService.getAllPublication();
        expect(publications).toHaveLength(1);
        expect(publications.some(publication => publication.getId() === 1)).toBeFalsy();
    });

    //deletePublication by an author
    it('should delete the publication with the id 1', async () => {
        const deletePublicatonCall = async () => await publicationService.deletePublication(userRepository.users[0], 1);        
        expect(deletePublicatonCall).rejects.toThrow(Error);
    });


    //changeStatus by an editor
    it ('Should change the status of the publication Id1 from false to true', async () => {
        await publicationService.changeStatus(userRepository.users[1],1,true);
        expect(await publicationService.getPublicationById(1)).toEqual(expect.objectContaining({ _status: true}));
    });

    //changeStatus by an author
    it ('Should change the status of the publication Id1 from false to true', async () => {
        const changeStatusCall = async () => await publicationService.changeStatus(userRepository.users[0],1,true);
        expect(changeStatusCall).rejects.toThrow(Error);
    });

});