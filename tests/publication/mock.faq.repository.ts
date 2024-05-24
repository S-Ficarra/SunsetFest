import { Faq } from "../../src/domain/models/publication/faq.model";
import { FaqRepository } from "../../src/domain/repositories/publication/faq.repository";

export class MockFaqRepository implements FaqRepository {


    public faqs: Faq[] = [
        new Faq (23, new Date, new Date, true,'question1', 'answer1'),
        new Faq (32, new Date, new Date, false,'question2', 'answer2'),
    ];

    setFakeIdToTest(): void {
        this.faqs[0].setId(1)
        this.faqs[1].setId(2)
    };

    getAllFaq(): Faq[] {
        return this.faqs;
    };

    getFaqById(faqId: number): Faq {
        return this.faqs[faqId - 1];
    };

    createFaq(faq: Faq): void {
        this.faqs.push(faq);
    };

    editFaq(faq: Faq): void {
        let faqId = faq.getId();
        this.faqs[faqId - 1] = faq;
    };
    
    deleteFaq(faqId: number): void {
        this.faqs = this.faqs.filter(faq => faq.getId() !== faqId);
    };













}