import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../authentification/authentification.service";
import { ProgramController } from "../controllers/controllers/program.controller";
import { bands } from "../database/entities/bands.entity";
import { images } from "../database/entities/images.entity";
import { locations } from "../database/entities/locations.entity";
import { performances } from "../database/entities/performances.entity";
import { programs } from "../database/entities/programs.entity";
import { publication_details } from "../database/entities/publication_details.entity";
import { stages } from "../database/entities/stages.entity";
import { timeframes } from "../database/entities/timeframes.entity";
import { users } from "../database/entities/users.entity";
import { StageRepositoryImpl } from "../database/repositories/facility/stage.repository.impl";
import { BandRepositoryImpl } from "../database/repositories/program/bands.repository.impl";
import { PerformanceRepositoryImpl } from "../database/repositories/program/performance.repository.impl";
import { ProgramRepositoryImpl } from "../database/repositories/program/program.repository.impl";
import { TimeFrameRepositoryImpl } from "../database/repositories/program/timeFrame.repository.impl";
import { UserRepositoryImpl } from "../database/repositories/users.repository.impl";
import { BandService } from "../services/band/band.service";
import { StageService } from "../services/facility/stage.service";
import { PerformanceService } from "../services/program/performance/performance.service";
import { TimeFrameService } from "../services/program/performance/timeFrame.service";
import { ProgramService } from "../services/program/program.service";
import { RoleService } from "../services/user/role.service";
import { UserService } from "../services/user/user.service";


@Module({

    imports: [
        TypeOrmModule.forFeature([programs]),
        TypeOrmModule.forFeature([performances]),
        TypeOrmModule.forFeature([bands]),
        TypeOrmModule.forFeature([publication_details]),
        TypeOrmModule.forFeature([images]),
        TypeOrmModule.forFeature([stages]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([timeframes]),
        TypeOrmModule.forFeature([users])
    ],
    providers: [
        ProgramService,
        {
            provide: 'ProgramRepository',
            useClass: ProgramRepositoryImpl,
        },
        PerformanceService, 
        {
            provide: 'PerformanceRepository',
            useClass: PerformanceRepositoryImpl,
        },
        BandService, 
        {
            provide: 'BandRepository',
            useClass: BandRepositoryImpl,
        },
        StageService,
        {
            provide: 'StageRepository',
            useClass: StageRepositoryImpl,
        },
        TimeFrameService,
        {
            provide: 'TimeFrameRepository',
            useClass: TimeFrameRepositoryImpl,
        },
        UserService, {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
        RoleService,
        AuthentificationService,
        JwtService,
    ],
    controllers: [ProgramController]
})
export class ProgramModule {}