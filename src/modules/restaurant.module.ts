import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { RestaurantController } from "src/controllers/restaurant.controller";
import { locations } from "src/database/entities/locations.entity";
import { opening_times } from "src/database/entities/opening_times.entity";
import { restaurants } from "src/database/entities/restaurants.entity";
import { users } from "src/database/entities/users.entity";
import { RestaurantRepositoryImpl } from "src/database/repositories/facility/restaurant.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { RestaurantService } from "src/services/facility/shop/restaurant.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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