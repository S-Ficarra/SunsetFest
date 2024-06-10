import { publications } from "src/database/entities/publications.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { News } from "src/domain/models/publication/news.model";
import { User } from "src/domain/models/user/user.model";
import { users } from "src/database/entities/users.entity";
import { Content } from "src/domain/models/publication/content.model";


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
