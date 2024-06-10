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
import { mapCreatedProgram, mapProgramToEntity } from 'src/database/mappers/program/program.mapper';

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


    async getAllPrograms(): Promise<Program[]> {
        const allPrograms = await this.progRepository.find();
        const programMap = new Map<number, Program>();
    
        for (const progLine of allPrograms) {
            if (!programMap.has(progLine.id)) {
                const prog = new Program([]);
                prog.setId(progLine.id);
                programMap.set(progLine.id, prog);
            }
        }
    
        const performancePromises = allPrograms.map(async (progLine) => {
            const performance = await this.perfService.getPerformanceById(progLine.performance_);
            return { progLineId: progLine.id, performance };
        });
    
        const performances = await Promise.all(performancePromises);
    
        performances.forEach(({ progLineId, performance }) => {
            const concernedProg = programMap.get(progLineId);
            if (concernedProg) {
                concernedProg.addPerformance(performance);
            }
        });
    
        return Array.from(programMap.values());
    };
    




    async getProgramById(programId: number): Promise<Program> {
        const program = new Program ([])
        const allProgramId = await this.progRepository.findBy({id: programId})
        await Promise.all(allProgramId.map(async perf_entity => {
            const perf = await this.perfService.getPerformanceById(perf_entity.performance_);
            program.addPerformance(perf);
        }));
        return program;
    };


    async createProgram(id: number): Promise<Program> {
        const createdProgram = mapCreatedProgram(id);
        await this.progRepository.save(createdProgram);
        const program = new Program([]);
        program.setId(createdProgram.id);
        return program;
    }


    async addPerformanceToProgram(programId: number, performance: Performance): Promise<void> {
        const program = await this.progRepository.findOneBy({id: programId})
        if(program) {
            const perfToAdd = mapProgramToEntity(programId, performance);
            await this.progRepository.save(perfToAdd);
        } else {
            throw new Error ('Program ${programId} does not exist')
        };
    };

    async deletePerformanceFromProgram(programId: number, performanceId: number): Promise<void> {
        await this.progRepository.delete({id: programId, performance_: performanceId})
    };

    
}
