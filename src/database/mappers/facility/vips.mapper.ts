import { locations } from "src/database/entities/locations.entity";
import { vips } from "src/database/entities/vips.entity";
import { Vip } from "src/domain/models/facility/vip.model";

export function mapVipModelToEntity(model: Vip, location: locations): vips {

    const entity = new vips();
    entity.name = model.getName();
    entity.location_ = location
    return entity;
};

export function mapVipModelToEntityEdit(model: Vip, location: locations): vips {

    const entity = new vips();
    entity.id = model.getId()
    entity.name = model.getName();
    entity.location_ = location
    return entity;
};

export function mapVipEntityToModel(entity: vips, longitude: number, latitude: number): Vip {

    const vip = new Vip(
        entity.name,
        longitude,
        latitude
    );
    vip.setId(entity.id)
    return vip
};
