import { PublicationType } from "./PublicationTypes";
import { Publication } from "./publication.model"; 

export class Faq extends Publication {

    private _question: string;
    private _answer: string

    constructor (userId: number, createdAt: Date, modifiedAt: Date, status: boolean, question: string, answer: string) {
        super (userId, createdAt, modifiedAt, status, PublicationType.Faq)
        this._question = question;
        this._answer = answer;
    };

    setQuestion(question: string): void {
        this._question = question;
    };

    getQuestion(): string {
        return this._question
    };

    setAnswer(answer: string): void {
        this._answer = answer;
    };

    getAnswer(): string {
        return this._answer;
    };

};