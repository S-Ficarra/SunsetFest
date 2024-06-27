import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { timeframes } from "../../../database/entities/timeframes.entity";
import { TimeFrame } from "../../../domain/models/program/performance/timeFrame.model";
import { TimeFrameRepository } from "../../../domain/repositories/program/performance/timeFrame.repository";
import { mapTimeFrameToEntity, mapTimeFrameToModel } from '../../../database/mappers/program/timeFrame.mapper';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TimeFrameRepositoryImpl implements TimeFrameRepository {

    constructor(
        @InjectRepository(timeframes)
        private timeFrameRepository: Repository<timeframes>,
    ){};


    async getTimeFrameById(timeFrameId: number): Promise<TimeFrame> {
        const timeFrame_entity = await this.timeFrameRepository.findOneBy({id: timeFrameId});
        return mapTimeFrameToModel(timeFrame_entity);
    };
    
    async getAllTimeFrame(): Promise<TimeFrame[]> {
        const allTimeFrame = await this.timeFrameRepository.find();
        const mappedAllTimeFrame = allTimeFrame.map (async timeFrame_entity => {
            return mapTimeFrameToModel(timeFrame_entity);
        });
        return Promise.all(mappedAllTimeFrame);
    };

    async createTimeFrame(timeFrame: TimeFrame): Promise<TimeFrame> {
        const timeFrame_entity = mapTimeFrameToEntity(timeFrame);
        const createdTimeFrame = await this.timeFrameRepository.save(timeFrame_entity);
        timeFrame.setId(createdTimeFrame.id);
        return timeFrame;
    };

    async editTimeFrame(timeFrame: TimeFrame): Promise<TimeFrame> {
        const timeFrame_entity = mapTimeFrameToEntity(timeFrame);
        const editedTimeFrame = await this.timeFrameRepository.save(timeFrame_entity);
        timeFrame.setId(editedTimeFrame.id);
        return timeFrame;
    };

    async deleteTimeFrame(timeFrameId: number): Promise<void> {
        await this.timeFrameRepository.delete(timeFrameId);
    };
    
};