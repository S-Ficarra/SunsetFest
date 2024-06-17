import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from 'src/domain/models/facility/stage.model';
import { stages } from 'src/database/entities/stages.entity';
import { locations } from 'src/database/entities/locations.entity';
import { StageRepository } from 'src/domain/repositories/facility/stage.repository';
import { mapFacilityLocationToEntity, mapFacilityLocationToEntityEdit } from '../../mappers/facility/facility.mapper';
import { mapStageEntityToModel, mapStageModelToEntity, mapStageModelToEntityEdit } from '../../mappers/facility/stage.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StageRepositoryImpl implements StageRepository {

    constructor(
        @InjectRepository(stages)
        private stagesRepository : Repository<stages>,
        @InjectRepository(locations)
        private locationRepository : Repository<locations>,
    ){};

    async getAllStages(): Promise<Stage[]> {
        const allStages = await this.stagesRepository.find()
        const mappedStagesPromises = allStages.map( async stage_entity => {
            if (stage_entity) {
                const location_entity = await this.locationRepository.findOneBy({id: stage_entity.location_.id});
                return mapStageEntityToModel(stage_entity, location_entity.longitude, location_entity.latitude);
            };
            return null;
        });
        return Promise.all(mappedStagesPromises);
    };

    async getStageById(stageId: number): Promise<Stage> {
        const stage_entity = await this.stagesRepository.findOneBy({id: stageId})
        if (stage_entity) {
            const location_entity = await this.locationRepository.findOneBy({id: stage_entity.location_.id});
            return mapStageEntityToModel(stage_entity, location_entity.longitude, location_entity.latitude);
        };
        return null;
    };

    async createStage(stage: Stage): Promise<Stage> {
        const location_entity = mapFacilityLocationToEntity(stage);
        const location_entity_saved = await this.locationRepository.save(location_entity);
        const stage_entity = mapStageModelToEntity(stage, location_entity_saved);
        const createdStage = await this.stagesRepository.save(stage_entity);
        stage.setId(createdStage.id);
        return stage;        
    };

    async editStage(stage: Stage): Promise<Stage> {
        const stageToEdit = await this.stagesRepository.findOneBy({id: stage.getId()});
        const location_entity = mapFacilityLocationToEntityEdit(stage, stageToEdit.location_.id);
        await this.locationRepository.save(location_entity);
        const stage_entity = mapStageModelToEntityEdit(stage, location_entity);
        const editedStage = await this.stagesRepository.save(stage_entity);
        stage.setId(editedStage.id);
        return stage;
    };
    
    async deleteStage(stageId: number): Promise<void> {
        const stageToDelete = await this.stagesRepository.findOneBy({id: stageId});
        const location_entity = await this.locationRepository.findOneBy({id: stageToDelete.location_.id});
        
        await this.locationRepository.delete(location_entity.id);
        await this.stagesRepository.delete(stageId);
    };
};