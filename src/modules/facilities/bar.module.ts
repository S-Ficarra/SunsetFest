import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { BarController } from "../../controllers/controllers/facilities/bar.controller";
import { bars } from "../../database/entities/bars.entity";
import { locations } from "../../database/entities/locations.entity";
import { opening_times } from "../../database/entities/opening_times.entity";
import { users } from "../../database/entities/users.entity";
import { BarRepositoryImpl } from "../../database/repositories/facility/bar.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { BarService } from "../../services/facility/shop/bar.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([bars]),
        TypeOrmModule.forFeature([opening_times]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        BarService,
        {
            provide: 'BarRepository',
            useClass: BarRepositoryImpl,
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
    controllers: [BarController],
})
export class BarModule {}