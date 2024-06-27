import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { StageController } from "../../controllers/controllers/facilities/stages.controller";
import { locations } from "../../database/entities/locations.entity";
import { stages } from "../../database/entities/stages.entity";
import { users } from "../../database/entities/users.entity";
import { StageRepositoryImpl } from "../../database/repositories/facility/stage.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { StageService } from "../../services/facility/stage.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";



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