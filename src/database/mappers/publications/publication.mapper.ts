import { Publication } from "src/domain/models/publication/publication.model";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publications } from "src/database/entities/publications.entity";



export function mapPubliDetailsToEntity (model: Publication): publication_details{
    const entity = new publication_details();
    entity.author_ = model.getUser().getId(),
    entity.created_at = new Date();
    entity.modified_at = new Date();
    entity.status = model.getStatus();
    return entity;
};

export function mapPubliDetailsToEntityEdit (model: Publication): publication_details{
    const entity = new publication_details();
    entity.author_ = model.getUser().getId(),
    entity.created_at = model.getCreatedAt();
    entity.modified_at = new Date();
    entity.status = model.getStatus();
    return entity;
};

export function mapPublicationModelToEntity(fkpubli_content: number, fkimage: number, fkpubli_type: number, fkpubli_detail: number): publications{

    const entity = new publications();
    entity.images_ = fkimage;
    entity.publication__contents_ = fkpubli_content;
    entity.publication__details_ = fkpubli_detail;
    entity.publication__types_ = fkpubli_type
    return entity;

};
