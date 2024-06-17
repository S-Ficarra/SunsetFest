import { Camping } from "src/domain/models/facility/camping.model";
import { CampingDto } from "../DTO/camping.dot";


export function mapCampingDtoToModelCreate (campingDto: CampingDto) {

    const camping = new Camping (
        campingDto.name,
        campingDto.longitude,
        campingDto.latitude,
        campingDto.capacity
    );

    return camping;
};



export function mapCampingDtoToModelEdit (campingToEdit: Camping, campingDto: CampingDto) {

    campingToEdit.setName(campingDto.name);
    campingToEdit.setLongitude(campingDto.longitude);
    campingToEdit.setLatitude(campingDto.latitude);
    campingToEdit.setCapacity(campingDto.capacity);

    return campingToEdit;
}