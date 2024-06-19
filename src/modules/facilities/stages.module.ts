import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { StageController } from "src/controllers/controllers/facilities/stages.controller";
import { locations } from "src/database/entities/locations.entity";
import { stages } from "src/database/entities/stages.entity";
import { users } from "src/database/entities/users.entity";
import { StageRepositoryImpl } from "src/database/repositories/facility/stage.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { StageService } from "src/services/facility/stage.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([stages]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        StageService,
        {
            provide: 'StageRepository',
            useClass: StageRepositoryImpl,
        },
        UserService,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
        RoleService,
        AuthentificationService,
        JwtService,
    ],
    controllers: [StageController],
})
export class StageModule {}