import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { RestaurantController } from "../../controllers/controllers/facilities/restaurant.controller";
import { locations } from "../../database/entities/locations.entity";
import { opening_times } from "../../database/entities/opening_times.entity";
import { restaurants } from "../../database/entities/restaurants.entity";
import { users } from "../../database/entities/users.entity";
import { RestaurantRepositoryImpl } from "../../database/repositories/facility/restaurant.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { RestaurantService } from "../../services/facility/shop/restaurant.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


@Module({

    imports: [
        TypeOrmModule.forFeature([restaurants]),
        TypeOrmModule.forFeature([opening_times]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        RestaurantService,
        {
            provide: 'RestaurantRepository',
            useClass: RestaurantRepositoryImpl,
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
    controllers: [RestaurantController],
})
export class RestaurantModule {}