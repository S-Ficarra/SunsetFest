import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { BarController } from "src/controllers/bar.controller";
import { bars } from "src/database/entities/bars.entity";
import { locations } from "src/database/entities/locations.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { users } from "src/database/entities/users.entity";
import { BarRepositoryImpl } from "src/database/repositories/facility/bar.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { BarService } from "src/services/facility/shop/bar.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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