import { Toilet } from "src/domain/models/facility/toilet.model";
import { ToiletDto } from "../../DTO/facilities/toilet.dto";


export function mapToiletDtoToModelCreate (toiletDto : ToiletDto) {

    const toilet = new Toilet (
        toiletDto.name,
        toiletDto.longitude,
        toiletDto.latitude
    );

    return toilet;
};

export function mapToiletDtoToModelEdit (toiletToEdit: Toilet, toiletDto : ToiletDto) {

    toiletToEdit.setName(toiletDto.name);
    toiletToEdit.setLatitude(toiletDto.latitude);
    toiletToEdit.setLongitude(toiletDto.longitude);

    return toiletToEdit;

}