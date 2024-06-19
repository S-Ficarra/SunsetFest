import { Bar } from "src/domain/models/facility/shop/bar.model";
import { BarDto } from "../../DTO/facilities/bar.dto";
import { OpeningTimes } from "src/domain/models/facility/openingTimes.model";


export function mapBarDtoToModel (createBarDto: BarDto) {

    const openAt = new Date (createBarDto.openingTime);
    const closeAt = new Date (createBarDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    const bar = new Bar (
        createBarDto.name,
        createBarDto.longitude,
        createBarDto.latitude,
        openingTimes
    );

    return bar;
};


export function mapBarDtoToModelEdit (barToEdit: Bar, editBarDto: BarDto) {

    const openAt = new Date (editBarDto.openingTime);
    const closeAt = new Date (editBarDto.closingTime);

    const openingTimes = new OpeningTimes (
        openAt,
        closeAt
    );

    barToEdit.setName(editBarDto.name);
    barToEdit.setLongitude(editBarDto.longitude);
    barToEdit.setLatitude(editBarDto.latitude);
    barToEdit.setOpeningTimes(openingTimes);

    return barToEdit;

};