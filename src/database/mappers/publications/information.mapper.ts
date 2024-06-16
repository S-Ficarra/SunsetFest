import { publications } from "src/database/entities/publications.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { Information } from "src/domain/models/publication/information.model";
import { User } from "src/domain/models/user/user.model";
import { users } from "src/database/entities/users.entity";
import { Content } from "src/domain/models/publication/content.model";
import { publication_types } from "src/database/entities/publication_types.entity";
import { PublicationType } from "src/domain/models/publication/PublicationTypes";



export function mapInformationEntityToModel(publi_entity: publications, content_entity: publication_contents, image_entity: images, detail_entity: publication_details, user_entity: users) : Information {

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

    const information = new Information (
        user,
        detail_entity.created_at,
        detail_entity.modified_at,
        detail_entity.status,
        content
    );

    information.setId(publi_entity.id)
    return information;

};

export function mapInformationTypeToEntity (model: Information): publication_types{
    const entity = new publication_types();    
    entity.type = PublicationType.Information;
    return entity;
};

export function mapInformationTypeToEntityEdit (model: Information, typeId: number): publication_types{
    const entity = new publication_types();   
    entity.id = typeId 
    entity.type = model.getType();
    return entity;
};

