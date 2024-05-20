import { Publication } from "./publication.model"; 
import { Author } from "../user/author.model";

export class Faq extends Publication {

    public question: string;
    public answer: string

    constructor (id: number, authorId: Author, createdAt: Date, modifiedAt: Date, status: boolean, question: string, answer: string) {
        super (id, authorId, createdAt, modifiedAt, status)
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