import { Publication } from "../../../domain/models/publication/publication.model";
import { publication_details } from "../../../database/entities/publication_details.entity";
import { publications } from "../../../database/entities/publications.entity";
import { publication_contents } from "../../../database/entities/publication_contents.entity";
import { images } from "../../../database/entities/images.entity";
import { publication_types } from "../../../database/entities/publication_types.entity";



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
