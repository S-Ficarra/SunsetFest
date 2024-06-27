import { Faq } from "../../../domain/models/publication/faq.model";
import { User } from "../../../domain/models/user/user.model";
import { FaqDto } from "../../DTO/publications/faq.dto";


export function mapFaqDtoToModelCreate (faqDto: FaqDto, user: User) {

    const status = faqDto.status === 'true';    

    const faq = new Faq (
        user,
        new Date(),
        new Date(),
        status,
        faqDto.question,
        faqDto.answer
    );

    return faq;
};

export function mapFaqDtoToModelEdit (faqToEdit: Faq, faqDto: FaqDto, user: User) {

    const status = faqDto.status === 'true';    

    faqToEdit.setQuestion(faqDto.question);
    faqToEdit.setAnswer(faqDto.answer);
    faqToEdit.setUser(user);
    faqToEdit.setStatus(status);
    faqToEdit.setModifiedAt(new Date());

    return faqToEdit;
};