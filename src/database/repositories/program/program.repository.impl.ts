import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/domain/models/program/program.model';
import { programs } from 'src/database/entities/programs.entity';
import { performances } from 'src/database/entities/performances.entity';
import { ProgramRepository } from 'src/domain/repositories/program/program.repository';
import { Performance } from 'src/domain/models/program/performance/performance.model';
import { PerformanceService } from 'src/services/program/performance/performance.service';
import { PerformanceRepositoryImpl } from './performance.repository.impl';
import { bands } from 'src/database/entities/bands.entity';
import { images } from 'src/database/entities/images.entity';
import { locations } from 'src/database/entities/locations.entity';
import { publication_details } from 'src/database/entities/publication_details.entity';
import { stages } from 'src/database/entities/stages.entity';
import { timeframes } from 'src/database/entities/timeframes.entity';
import { users } from 'src/database/entities/users.entity';
import { mapProgramToEntity } from 'src/database/mappers/program/program.mapper';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ProgramRepositoryImpl implements ProgramRepository {

    private perfService: PerformanceService;

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
        @InjectRepository(programs)
        private readonly progRepository: Repository<programs>
    ) {

        const perfRepositoryImpl = new PerformanceRepositoryImpl(
            this.bandRepository,
            this.publicationDetailsRepository,
            this.imageRepository,
            this.userRepository,
            this.stagesRepository,
            this.locationRepository,
            this.timeFrameRepository,
            this.perfRepository
        );

        this.perfService = new PerformanceService(perfRepositoryImpl);
    };


    async findPerformanceInProgram(programYear: number, performanceId : number): Promise <Performance> {
        const perfInProg = await this.progRepository.findBy({year: programYear, performance_id : performanceId});
        if (perfInProg.length > 0) {
            const performance = await this.perfService.getPerformanceById(perfInProg[0].performance_id)
            return performance;
        };
    };
    
    async getProgramByYear(programYear: number): Promise<Program> {

        const program = new Program ([]);
        program.setId(programYear);  
        const programPerfs = await this.progRepository.findBy({year: programYear});
        if (programPerfs.length > 0) {
            await Promise.all(programPerfs.map(async perf_entity => {
                const perf = await this.perfService.getPerformanceById(perf_entity.performance_id);   
                program.addPerformance(perf);
            }));
            return program;
        };
    };

    
    async addPerformanceToProgram(program: Program, performance: Performance): Promise<void> {
        const performance_entity = await this.perfRepository.findOneBy({id: performance.getId()});
        const perfToAdd = mapProgramToEntity(program, performance_entity);
        await this.progRepository.insert(perfToAdd);
    };


    async deletePerformanceFromProgram(programYear: number, performanceId: number): Promise<void> {
        const performance = await this.perfRepository.findOneBy({id: performanceId});
        await this.progRepository.delete({year: programYear, performance_ : performance});
    };

    

};
