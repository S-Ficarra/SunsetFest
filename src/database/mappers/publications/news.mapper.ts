import { publications } from "../../../database/entities/publications.entity";
import { publication_details } from "../../../database/entities/publication_details.entity";
import { publication_contents } from "../../../database/entities/publication_contents.entity";
import { images } from "../../../database/entities/images.entity";
import { News } from "../../../domain/models/publication/news.model";
import { User } from "../../../domain/models/user/user.model";
import { users } from "../../../database/entities/users.entity";
import { Content } from "../../../domain/models/publication/content.model";
import { publication_types } from "../../../database/entities/publication_types.entity";
import { PublicationType } from "../../../domain/models/publication/PublicationTypes";


export function mapNewsEntityToModel(publi_entity: publications, content_entity: publication_contents, image_entity: images, detail_entity: publication_details, user_entity: users) : News {

    const user = new User (
        user_entity.name,
        user_entity.first_name,
        user_entity.email,
        user_entity.password,
        user_entity.role
    )

    const content = new Content (
        content_entity.title,
        content_entity.text,
        image_entity.image
    );

    const news = new News (
        user,
        detail_entity.created_at,
        detail_entity.modified_at,
        detail_entity.status,
        content
    );

    news.setId(publi_entity.id)
    return news;

};

export function mapNewsTypeToEntity (model: News): publication_types{
    const entity = new publication_types();       
    entity.type = PublicationType.News
    return entity;
};


export function mapNewsTypeToEntityEdit (model: News, typeId: number): publication_types{
    const entity = new publication_types();       
    entity.id = typeId;
    entity.type = PublicationType.News
    return entity;
};