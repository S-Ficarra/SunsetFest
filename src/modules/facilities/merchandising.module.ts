import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { MerchandisingController } from "src/controllers/controllers/facilities/merchandising.controller";
import { locations } from "src/database/entities/locations.entity";
import { merchandisings } from "src/database/entities/merchandisings.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { users } from "src/database/entities/users.entity";
import { MerchandisingRepositoryImpl } from "src/database/repositories/facility/merchandising.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { MerchandisingService } from "src/services/facility/shop/merchandising.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([merchandisings]),
        TypeOrmModule.forFeature([opening_times]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        MerchandisingService,
        {
            provide: 'MerchandisingRepository',
            useClass: MerchandisingRepositoryImpl,
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
    controllers: [MerchandisingController],
})
export class MerchandisingModule {}