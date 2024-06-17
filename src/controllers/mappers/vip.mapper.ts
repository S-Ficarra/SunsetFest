import { Vip } from "src/domain/models/facility/vip.model";
import { VipDto } from "../DTO/vip.dto";



export function mapVipDtoToModelCreate (vipDto : VipDto) {

    const vip = new Vip (
        vipDto.name,
        vipDto.longitude,
        vipDto.latitude
    );

    return vip;
};


export function mapVipDtoToModelEdit (vipToEdit: Vip, vipDto: VipDto) {

    vipToEdit.setName(vipDto.name);
    vipToEdit.setLatitude(vipDto.latitude);
    vipToEdit.setLongitude(vipDto.longitude);

    return vipToEdit;

};