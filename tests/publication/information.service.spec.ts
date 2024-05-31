import { Information } from "../../src/domain/models/publication/information.model";
import { InformationService } from "../../src/services/publication/information.service";
import { MockInformationRepository } from "./mockRepositories/mock.information.repository";
import { Content } from "../../src/domain/models/publication/content.model";
import { ContentService } from "../../src/services/publication/content.service";
import { MockContentRepository } from "./mockRepositories/mock.content.repository";
import { AdministratorService } from "../../src/services/user/administrator.service";
import { EditorService } from "../../src/services/user/editor.service";
import { MockUserRepository } from "../user/mock.user.repository";



describe('InformationService', () => {
    let contentService: ContentService;
    let contentRepository: MockContentRepository;
    let informationService: InformationService;
    let informationRepository: MockInformationRepository;
    let administratorService : AdministratorService;
    let editorService : EditorService;
    let userRepository : MockUserRepository;
    


    beforeEach(() => {
        userRepository = new MockUserRepository;
        administratorService = new AdministratorService(userRepository);
        editorService = new EditorService(userRepository);
        contentRepository = new MockContentRepository;
        contentService = new ContentService(contentRepository);
        informationRepository= new MockInformationRepository(contentRepository, userRepository);
        informationService = new InformationService(informationRepository, contentService, administratorService, editorService);
        informationRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
        userRepository.setFakeIdToTest();
    });
    
    //getAllInformation
    it('should return all information', () => {
        const information = informationService.getAllInformation();
        expect(information).toHaveLength(2);
        expect(information).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'information', _content: expect.objectContaining({_title: 'titleInformation1'})}),
            expect.objectContaining({_type: 'information', _content: expect.objectContaining({_title: 'titleInformation2'})})
        ]));
    });

    //getInformationById
    it("should return a information by it's id", () => {
        let foundInformation1 = informationService.getInformationById(1);
        expect(foundInformation1).toEqual(expect.objectContaining({_type: 'information', _content: expect.objectContaining({_title: 'titleInformation1'})}));

    });


    //createInformation
    it('should return a information just created', () => {
        const foundInformation3 = new Information (userRepository.users[0], new Date, new Date, true, new Content('titleInformation3', 'textInformation3', new Blob));
        informationService.createInformation(foundInformation3);
        expect(foundInformation3).toEqual(expect.objectContaining({ _id: 3, _type: 'information', _content: expect.objectContaining({_title: 'titleInformation3'})}));

    });

    
    //editInformation
    it('should return a information with titleEdited and textEdited', () => {
        const informationEdited = new Information (userRepository.users[0], new Date, new Date, true, new Content('titleEdited', 'textEdited', new Blob));
        informationEdited.setId(1)
        const foundInformationEdited = informationService.editInformation(informationEdited);
        expect(foundInformationEdited).toEqual(expect.objectContaining({ _content: expect.objectContaining({_title: 'titleEdited', _text: 'textEdited'})}));

    });


    //deleteInformation by an admin or editor
    it('should return the information list without the one with id 1', () => {
        informationService.deleteInformation(2, 1)
        expect(informationRepository.informations.some(information => information.getId() === 1)).toBeFalsy();
    });

    //deleteInformation by an author
    it('should delete the publication with the id 1', () => {
        const deleteInformationCall = () => informationService.deleteInformation(1, 1);        
        expect(deleteInformationCall).toThrow(Error);
    });

    //changeStatus by an editor
    it ('Should change the status of the publication Id1 from false to true', () => {
        informationService.changeStatus(2,1,false);
        expect(informationService.getInformationById(1)).toEqual(expect.objectContaining({ _status: false}));
    });

    //changeStatus by an author
    it ('Should change the status of the publication Id1 from false to true', () => {
        const changeStatusCall = () => informationService.changeStatus(1,1,false);
        expect(changeStatusCall).toThrow(Error);
    });



});