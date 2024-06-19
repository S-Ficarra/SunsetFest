import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";
import { MerchandisingDto } from "../../DTO/facilities/merchandising.dto";
import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";


export function mapMerchandisingDtoToModel (createMerchandisingDto: MerchandisingDto) {

    const openAt = new Date (createMerchandisingDto.openingTime);
    const closeAt = new Date (createMerchandisingDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    const merch = new Merchandising (
        createMerchandisingDto.name,
        createMerchandisingDto.longitude,
        createMerchandisingDto.latitude,
        openingTimes,
        createMerchandisingDto.merchType
    );

    return merch;
};


export function mapMerchandisingDtoToModelEdit (merchToEdit: Merchandising, editMerchandisingDto: MerchandisingDto) {

    const openAt = new Date (editMerchandisingDto.openingTime);
    const closeAt = new Date (editMerchandisingDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    merchToEdit.setName(editMerchandisingDto.name);
    merchToEdit.setLongitude(editMerchandisingDto.longitude);
    merchToEdit.setLatitude(editMerchandisingDto.latitude);
    merchToEdit.setOpeningTimes(openingTimes);
    merchToEdit.setMerchType(editMerchandisingDto.merchType)

    return merchToEdit;

};