import { publication_contents } from "../../../database/entities/publication_contents.entity";
import { images } from "../../../database/entities/images.entity";
import { Illustrated } from "../../../domain/models/publication/illustrated.model";



export function mapIllustratedPubliContentToEntity (model: Illustrated): publication_contents {
    const entity = new publication_contents();
    entity.title = model.getContent().getTitle();
    entity.text = model.getContent().getText();
    return entity;
};

export function mapIllustratedPubliContentToEntityEdit (model: Illustrated, contentId: number): publication_contents {
    const entity = new publication_contents();
    entity.id = contentId;
    entity.title = model.getContent().getTitle();
    entity.text = model.getContent().getText();
    return entity;
};

export function mapIllustratedImageToEntity (model: Illustrated): images{
    const entity = new images();
    entity.image = model.getContent().getImage();
    return entity;
};

export function mapIllustratedImageToEntityEdit (model: Illustrated, imageId: number): images{
    const entity = new images();
    entity.id = imageId;
    entity.image = model.getContent().getImage();
    return entity;
};


