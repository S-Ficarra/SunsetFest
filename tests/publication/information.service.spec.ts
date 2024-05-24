import { Information } from "../../src/domain/models/publication/information.model";
import { InformationService } from "../../src/services/publication/information.service";
import { MockInformationRepository } from "./mock.information.repository";
import { Content } from "../../src/domain/models/publication/content.model";
import { ContentService } from "../../src/services/publication/content.service";
import { MockContentRepository } from "./mock.content.repository";



describe('InformationService', () => {
    let contentService: ContentService;
    let contentRepository: MockContentRepository;
    let informationService: InformationService;
    let informationRepository: MockInformationRepository;


    beforeEach(() => {
        contentRepository = new MockContentRepository;
        contentService = new ContentService(contentRepository);
        informationRepository= new MockInformationRepository();
        informationService = new InformationService(informationRepository, contentService/*, publicationService*/);
        informationRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
    });
    
    //getAllInformation
    it('should return all information', () => {
        const information = informationService.getAllInformation();
        expect(information).toHaveLength(2);
        expect(information).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'information', content: expect.objectContaining({title: 'titleInformation1'})}),
            expect.objectContaining({_type: 'information', content: expect.objectContaining({title: 'titleInformation2'})})
        ]));
    });

    //getInformationById
    it("should return a information by it's id", () => {
        let foundInformation1 = informationService.getInformationById(1);
        expect(foundInformation1).toEqual(expect.objectContaining({_type: 'information', content: expect.objectContaining({title: 'titleInformation1'})}));

    });


    //createInformation
    it('should return a information just created', () => {
        informationService.createInformation(new Information (1, new Date, new Date, true, new Content('titleInformation3', 'textInformation3', new Blob)));
        const foundInformation3 = informationService.getInformationById(3);       
        expect(foundInformation3).toEqual(expect.objectContaining({ _id: 3, _type: 'information', content: expect.objectContaining({title: 'titleInformation3'})}));

    });

    
    //editInformation
    it('should return a information with titleEdited and textEdited', () => {
        const informationEdited = new Information (1, new Date, new Date, true, new Content('titleEdited', 'textEdited', new Blob));
        informationEdited.setId(1)
        informationService.editInformation(informationEdited);
        const foundInformationEdited = informationService.getInformationById(1)
        expect(foundInformationEdited).toEqual(expect.objectContaining({ content: expect.objectContaining({title: 'titleEdited', text: 'textEdited'})}));

    })


    //deleteInformation
    it('should return the information list without the one with id 3', () => {
        informationService.createInformation(new Information (1, new Date, new Date, true, new Content('titleInformation3', 'textInformation3', new Blob)));
        const informationToDelete = informationService.getInformationById(3);
        informationService.deleteInformation(informationToDelete.getId())
        expect(informationRepository.information.some(information => information.getId() === 3)).toBeFalsy();

    })



});