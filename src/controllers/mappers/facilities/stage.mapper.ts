import { Stage } from "src/domain/models/facility/stage.model";
import { StageDto } from "../../DTO/facilities/stage.dto";



export function mapStageDtoToModel (stageDto: StageDto) {

    const stage = new Stage (
        stageDto.name,
        stageDto.longitude,
        stageDto.latitude,
        stageDto.capacity,
    );

    return stage ;
};

export function mapStageDtoToModelEdit (stageToEdit: Stage, stageDto: StageDto) {

    stageToEdit.setName(stageDto.name);
    stageToEdit.setLongitude(stageDto.longitude);
    stageToEdit.setLatitude(stageDto.latitude);
    stageToEdit.setCapacity(stageDto.capacity);

    return stageToEdit;
};