import { Faq } from "src/domain/models/publication/faq.model";
import { faqs } from "src/database/entities/faqs.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { users } from "src/database/entities/users.entity";
import { User } from "src/domain/models/user/user.model";


export function mapFaqModeltoEntity (model: Faq, publiDetails: publication_details): faqs {
    const entity = new faqs();
    entity.question = model.getQuestion();
    entity.answer = model.getAnswer();
    entity.publication__details_ = publiDetails;
    return entity;

};

export function mapFaqModeltoEntityEdit (faqId: number, model: Faq, publiDetails: publication_details): faqs {
    const entity = new faqs();
    entity.id = faqId;
    entity.question = model.getQuestion();
    entity.answer = model.getAnswer();
    entity.publication__details_ = publiDetails;
    return entity;

};

export function mapFaqEntitytoModel (entity: faqs, publiDetails: publication_details, user: users): Faq {

    const faqUser = new User (
        user.name,
        user.first_name,
        user.email,
        user.password,
        user.role
    )
    faqUser.setId(user.id)

    const faq = new Faq (
        faqUser,
        publiDetails.created_at,
        publiDetails.modified_at,
        publiDetails.status,
        entity.question,
        entity.answer,
    );

    faq.setId(entity.id);
    return faq
};

