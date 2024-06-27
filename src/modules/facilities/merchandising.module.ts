import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { MerchandisingController } from "../../controllers/controllers/facilities/merchandising.controller";
import { locations } from "../../database/entities/locations.entity";
import { merchandisings } from "../../database/entities/merchandisings.entity";
import { opening_times } from "../../database/entities/opening_times.entity";
import { users } from "../../database/entities/users.entity";
import { MerchandisingRepositoryImpl } from "../../database/repositories/facility/merchandising.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { MerchandisingService } from "../../services/facility/shop/merchandising.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


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