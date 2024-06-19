import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { CampingController } from "src/controllers/controllers/facilities/camping.controller";
import { campings } from "src/database/entities/campings.entity";
import { locations } from "src/database/entities/locations.entity";
import { users } from "src/database/entities/users.entity";
import { CampingRepositoryImpl } from "src/database/repositories/facility/camping.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { CampingService } from "src/services/facility/camping.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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