import { Faq } from "../../src/domain/models/publication/faq.model";
import { FaqService } from "../../src/services/publication/faq.service";
import { MockFaqRepository } from "./mock.faq.repository";


describe('FaqService', () => {
    let faqService: FaqService;
    let faqRepository: MockFaqRepository;


    beforeEach(() => {
        faqRepository = new MockFaqRepository();
        faqService = new FaqService(faqRepository/*, publicationService*/);
        faqRepository.setFakeIdToTest();
    });

    //getAllFaqs
    it('Should return all faqs', () => {
        const faqs = faqService.getAllFaq();
        expect(faqs).toHaveLength(2);
        expect(faqs).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'faq', question: 'question1', answer: 'answer1'}),
            expect.objectContaining({_type: 'faq', question: 'question2', answer: 'answer2'})
        ]));
    });


    //getFaqById
    it('Should return the faq id 1 with the question: question 1', () => {
        const foundFaq1 = faqService.getFaqById(1);
        expect(foundFaq1).toEqual(expect.objectContaining({_type: 'faq', question: 'question1', answer: 'answer1'}));
    });


    //createFaq
    it('should return the new faq created', () => {
        faqService.createFaq(new Faq (666, new Date, new Date, false, 'question3', 'answer3'));
        let foundFaq3 = faqService.getFaqById(3);
        expect(foundFaq3).toEqual(expect.objectContaining({_authorId: 666, question: 'question3', answer: 'answer3'}));
    });


    //editFaq
    it('should return the faq1 with question and answer edited', () => {
        let creationDate = faqRepository.faqs[0].getCreatedAt();
        let editedFaq = new Faq (2526, creationDate, new Date, true, 'questionEdited', 'answerEdited');
        editedFaq.setId(1);
        faqService.editFaq(editedFaq);
        let foundFaqEdited = faqService.getFaqById(1);
        expect(foundFaqEdited).toEqual(expect.objectContaining({_authorId: 2526, question: 'questionEdited', answer: 'answerEdited'}));        
    });


    //deleteFaq
    it('should return the faqs array without the faq with id1', () => {
        faqService.deleteFaq(1)
        let allFaqs = faqRepository.faqs
        expect(allFaqs.some(faqs => faqs.getId() === 1)).toBeFalsy();
    });


});
