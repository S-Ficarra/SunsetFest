import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Performance } from 'src/domain/models/program/performance/performance.model';
import { performances } from 'src/database/entities/performances.entity';
import { PerformanceRepository } from 'src/domain/repositories/program/performance/performance.repository';
import { bands } from 'src/database/entities/bands.entity';
import { stages } from 'src/database/entities/stages.entity';
import { timeframes } from 'src/database/entities/timeframes.entity';
import { BandService } from 'src/services/band/band.service';
import { RoleService } from 'src/services/user/role.service';
import { BandRepositoryImpl } from './bands.repository.impl';
import { images } from 'src/database/entities/images.entity';
import { publication_details } from 'src/database/entities/publication_details.entity';
import { users } from 'src/database/entities/users.entity';
import { StageRepositoryImpl } from '../facility/stage.repository.impl';
import { StageService } from 'src/services/facility/stage.service';
import { locations } from 'src/database/entities/locations.entity';
import { mapPerformanceEntitytoModel, mapPerformanceModeltoEntity, mapPerformanceModeltoEntityEdit } from 'src/database/mappers/program/performance.mapper';
import { TimeFrameService } from 'src/services/program/performance/timeFrame.service';
import { TimeFrameRepositoryImpl } from './timeFrame.repository.impl';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PerformanceRepositoryImpl implements PerformanceRepository {
    
    timeFrameService: TimeFrameService;
    bandService: BandService;
    stageService: StageService;

    constructor(
        @InjectRepository(bands)
        private readonly bandRepository: Repository<bands>,
        @InjectRepository(publication_details)
        private readonly publicationDetailsRepository: Repository<publication_details>,
        @InjectRepository(images)
        private readonly imageRepository: Repository<images>,
        @InjectRepository(users)
        private readonly userRepository: Repository<users>,
        @InjectRepository(stages)
        private readonly stagesRepository: Repository<stages>,
        @InjectRepository(locations)
        private readonly locationRepository: Repository<locations>,
        @InjectRepository(timeframes)
        private readonly timeFrameRepository: Repository<timeframes>,
        @InjectRepository(performances)
        private readonly perfRepository: Repository<performances>,
    ) {
        const timeFrameRepositoryImpl = new TimeFrameRepositoryImpl(this.timeFrameRepository);
        this.timeFrameService = new TimeFrameService(timeFrameRepositoryImpl);

        const roleService = new RoleService();
        const bandImplRepository = new BandRepositoryImpl(this.bandRepository, this.publicationDetailsRepository, this.imageRepository, this.userRepository);
        this.bandService = new BandService(bandImplRepository, roleService);

        const stageImplRepository = new StageRepositoryImpl(this.stagesRepository, this.locationRepository);
        this.stageService = new StageService(stageImplRepository);
    }


    async getAllPerformances(): Promise<Performance[]> {
        const allPerformances = await this.perfRepository.find();
        const mappedAllPerf = allPerformances.map(async perf_entity => {
            if (perf_entity) {
                const band = await this.bandService.getBandById(perf_entity.band_.id);
                const stage = await this.stageService.getStageById(perf_entity.stage_.id);
                const timeFrame = await this.timeFrameService.getTimeFrameById(perf_entity.timeframe_.id);
                return mapPerformanceEntitytoModel(perf_entity, band, timeFrame, stage);
            };
            return null;
        });
        return Promise.all(mappedAllPerf);
    };

    async getPerformanceById(performanceId: number): Promise<Performance> {
        const perf_entity = await this.perfRepository.findOneBy({id: performanceId});
        if (perf_entity) {
            const band = await this.bandService.getBandById(perf_entity.band_.id);
            const stage = await this.stageService.getStageById(perf_entity.stage_.id);
            const timeFrame = await this.timeFrameService.getTimeFrameById(perf_entity.timeframe_.id);
            return mapPerformanceEntitytoModel(perf_entity, band, timeFrame, stage);
        };
        return null;
    };

    async createPerformance(performance: Performance): Promise<Performance> {
        const band = await this.bandRepository.findOneBy({id: performance.getBand().getId()}) 
        const stage = await this.stagesRepository.findOneBy({id: performance.getStage().getId()})
        const timeFrame = await this.timeFrameRepository.findOneBy({id: performance.getTimeFrame().getId()}) 
        const createdPerformance = mapPerformanceModeltoEntity(performance, band, stage, timeFrame);
        await this.perfRepository.save(createdPerformance);
        performance.setId(createdPerformance.id);
        return performance;
    };

    async editPerformance(performance: Performance): Promise<Performance> {
        const band = await this.bandRepository.findOneBy({id: performance.getBand().getId()}) 
        const stage = await this.stagesRepository.findOneBy({id: performance.getStage().getId()})
        const timeFrame = await this.timeFrameRepository.findOneBy({id: performance.getTimeFrame().getId()}) 
        const editedPerformance = mapPerformanceModeltoEntityEdit(performance, band, stage, timeFrame);
        await this.perfRepository.save(editedPerformance);
        performance.setId(editedPerformance.id);
        return performance;
    };

    async deletePerformance(performanceId: number): Promise<void> {
        this.perfRepository.delete(performanceId);
    };

};