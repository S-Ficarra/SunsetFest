import { publication_types } from "src/database/entities/publication_types.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { images } from "src/database/entities/images.entity";
import { Illustrated } from "src/domain/models/publication/illustrated.model";



export function mapIllustratedPubliContentToEntity (model: Illustrated): publication_contents {
    const entity = new publication_contents();
    entity.title = model.getContent().getTitle();
    entity.text = model.getContent().getText();
    return entity;
};

export function mapIllustratedImageToEntity (model: Illustrated): images{
    const entity = new images();
    entity.image = model.getContent().getImage();
    return entity;
};

export function mapIllustratedTypeToEntity (model: Illustrated): publication_types{
    const entity = new publication_types();
    entity.type = model.getType();
    return entity;
};
