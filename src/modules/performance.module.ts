import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { PerformanceController } from "src/controllers/controllers/performance.controller";
import { bands } from "src/database/entities/bands.entity";
import { images } from "src/database/entities/images.entity";
import { locations } from "src/database/entities/locations.entity";
import { performances } from "src/database/entities/performances.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { stages } from "src/database/entities/stages.entity";
import { timeframes } from "src/database/entities/timeframes.entity";
import { users } from "src/database/entities/users.entity";
import { StageRepositoryImpl } from "src/database/repositories/facility/stage.repository.impl";
import { BandRepositoryImpl } from "src/database/repositories/program/bands.repository.impl";
import { PerformanceRepositoryImpl } from "src/database/repositories/program/performance.repository.impl";
import { TimeFrameRepositoryImpl } from "src/database/repositories/program/timeFrame.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { BandService } from "src/services/band/band.service";
import { StageService } from "src/services/facility/stage.service";
import { PerformanceService } from "src/services/program/performance/performance.service";
import { TimeFrameService } from "src/services/program/performance/timeFrame.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


@Module({

    imports: [
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
    controllers: [PerformanceController],
})
export class PerformanceModule {}