import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { CampingController } from "../../controllers/controllers/facilities/camping.controller";
import { campings } from "../../database/entities/campings.entity";
import { locations } from "../../database/entities/locations.entity";
import { users } from "../../database/entities/users.entity";
import { CampingRepositoryImpl } from "../../database/repositories/facility/camping.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { CampingService } from "../../services/facility/camping.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([campings]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        CampingService,
        {
            provide: 'CampingRepository',
            useClass: CampingRepositoryImpl,
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
    controllers: [CampingController],
})
export class CampingModule {}