import { Faq } from "../../src/domain/models/publication/faq.model";
import { FaqService } from "../../src/services/publication/faq.service";
import { MockFaqRepository } from "./mockRepositories/mock.faq.repository";
import { RoleService } from "../../src/services/user/role.service";
import { MockUserRepository } from "../user/mock.user.repository";


describe('FaqService', () => {
    let faqService: FaqService;
    let faqRepository: MockFaqRepository;
    let roleService : RoleService;
    let userRepository : MockUserRepository;


    beforeEach(() => {
        userRepository = new MockUserRepository;
        roleService = new RoleService();
        faqRepository = new MockFaqRepository(userRepository);
        faqService = new FaqService(faqRepository, roleService);
        faqRepository.setFakeIdToTest();
        userRepository.setFakeIdToTest();
    });

    //getAllFaqs
    it('Should return all faqs', () => {
        const faqs = faqService.getAllFaq();
        expect(faqs).toHaveLength(2);
        expect(faqs).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'faq', _question: 'question1', _answer: 'answer1'}),
            expect.objectContaining({_type: 'faq', _question: 'question2', _answer: 'answer2'})
        ]));
    });


    //getFaqById
    it('Should return the faq id 1 with the question: question 1', () => {
        const foundFaq1 = faqService.getFaqById(1);
        expect(foundFaq1).toEqual(expect.objectContaining({_type: 'faq', _question: 'question1', _answer: 'answer1'}));
    });


    //createFaq
    it('should return the new faq created', () => {
        let foundFaq3 =new Faq (userRepository.users[0], new Date, new Date, false, 'question3', 'answer3');
        faqService.createFaq(foundFaq3);
        expect(foundFaq3).toEqual(expect.objectContaining({_user: expect.objectContaining({_id: 1,}), _question: 'question3', _answer: 'answer3'}));
    });


    //editFaq
    it('should return the faq1 with question and answer edited', () => {
        let creationDate = faqRepository.faqs[0].getCreatedAt();
        let editedFaq = new Faq (userRepository.users[0], creationDate, new Date, true, 'questionEdited', 'answerEdited');
        editedFaq.setId(1);
        let foundFaqEdited = faqService.editFaq(editedFaq);
        expect(foundFaqEdited).toEqual(expect.objectContaining({_user: expect.objectContaining({_id: 1,}), _question: 'questionEdited', _answer: 'answerEdited'}));        
    });


    //deleteFaq by editor or administrator
    it('should return the faqs array without the faq with id1', () => {
        faqService.deleteFaq(userRepository.users[1], 1)
        expect(faqRepository.faqs.some(faqs => faqs.getId() === 1)).toBeFalsy();
    });

    //deleteFaq by an author
    it('should delete the publication with the id 1', () => {
        const deleteFaqCall = () => faqService.deleteFaq(userRepository.users[0], 1);        
        expect(deleteFaqCall).toThrow(Error);
    });

    //changeStatus by an editor
    it ('Should change the status of the publication Id1 from false to true', () => {
        faqService.changeStatus(userRepository.users[1],1,false);
        expect(faqService.getFaqById(1)).toEqual(expect.objectContaining({ _status: false}));
    });

    //changeStatus by an author
    it ('Should change the status of the publication Id1 from false to true', () => {
        const changeStatusCall = () => faqService.changeStatus(userRepository.users[0],1,false);
        expect(changeStatusCall).toThrow(Error);
    });


});
