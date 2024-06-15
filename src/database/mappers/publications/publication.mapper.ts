import { Publication } from "src/domain/models/publication/publication.model";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publications } from "src/database/entities/publications.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { publication_types } from "src/database/entities/publication_types.entity";



export function mapPubliDetailsToEntity (model: Publication): publication_details{
    const entity = new publication_details();
    entity.author_ = model.getUser().getId(),
    entity.created_at = new Date();
    entity.modified_at = new Date();
    entity.status = model.getStatus();
    return entity;
};

export function mapPubliDetailsToEntityEdit (model: Publication, publiDetailId : number): publication_details{
    const entity = new publication_details();
    entity.id = publiDetailId;
    entity.author_ = model.getUser().getId(),
    entity.created_at = model.getCreatedAt();
    entity.modified_at = new Date();
    entity.status = model.getStatus();
    return entity;
};

export function mapPublicationModelToEntity(publi_content: publication_contents, image: images, publi_type: publication_types, publi_detail: publication_details): publications{

    const entity = new publications();
    entity.images_ = image;
    entity.publication__contents_ = publi_content;
    entity.publication__details_ = publi_detail;
    entity.publication__types_ = publi_type
    return entity;

};

export function mapPublicationModelToEntityEdit (newsid: number, publi_content: publication_contents, image: images, publi_type: publication_types, publi_detail: publication_details): publications{

    const entity = new publications();
    entity.id= newsid
    entity.images_ = image;
    entity.publication__contents_ = publi_content;
    entity.publication__details_ = publi_detail;
    entity.publication__types_ = publi_type
    return entity;

};
