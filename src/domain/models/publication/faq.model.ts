import { Publication } from "./publication.model"; 

export class Faq extends Publication {

    public question: string;
    public answer: string

    constructor (authorId: number, createdAt: Date, modifiedAt: Date, status: boolean, question: string, answer: string) {
        super (authorId, createdAt, modifiedAt, status, "faq")
        this.question = question;
        this.answer = answer;
    };

    setQuestion(question: string): void {
        this.question = question;
    };

    getQuestion(): string {
        return this.question
    };

    setAnswer(answer: string): void {
        this.answer = answer;
    };

    getAnswer(): string {
        return this.answer;
    };

};