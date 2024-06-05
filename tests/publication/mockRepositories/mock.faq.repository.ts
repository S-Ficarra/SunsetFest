import { MockUserRepository } from "tests/user/mock.user.repository";
import { Faq } from "../../../src/domain/models/publication/faq.model";
import { FaqRepository } from "../../../src/domain/repositories/publication/faq.repository";

export class MockFaqRepository implements FaqRepository {

    public userRepository: MockUserRepository;
    public faqs : Faq [] = [];

    constructor(userRepository: MockUserRepository) {
        this. userRepository = userRepository;
        userRepository.setFakeIdToTest();
        this.initializeFaq()
    };

    initializeFaq(): void {
        this.faqs.push(
            new Faq (this.userRepository.users[0], new Date, new Date, true,'question1', 'answer1'),
            new Faq (this.userRepository.users[0], new Date, new Date, false,'question2', 'answer2'),
        );
    };

    setFakeIdToTest(): void {
        this.faqs[0].setId(1)
        this.faqs[1].setId(2)
    };

    async getAllFaq(): Promise<Faq[]> {
        return this.faqs;
    };

    async getFaqById(faqId: number): Promise<Faq> {
        return this.faqs[faqId - 1];
    };

    async createFaq(faq: Faq): Promise<Faq> {
        this.faqs.push(faq);
        return faq;
    };

    async editFaq(faq: Faq): Promise<Faq> {
        let faqId = faq.getId();
        this.faqs[faqId - 1] = faq;
        return faq;
    };
    
    async deleteFaq(faqId: number): Promise<void> {
        this.faqs = this.faqs.filter(faq => faq.getId() !== faqId);
    };













}