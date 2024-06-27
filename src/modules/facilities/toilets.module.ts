import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { ToiletController } from "../../controllers/controllers/facilities/toilets.controller";
import { locations } from "../../database/entities/locations.entity";
import { toilets } from "../../database/entities/toilets.entity";
import { users } from "../../database/entities/users.entity";
import { ToiletRepositoryImpl } from "../../database/repositories/facility/toilets.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { ToiletService } from "../../services/facility/toilet.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([toilets]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        ToiletService,
        {
            provide: 'ToiletRepository',
            useClass: ToiletRepositoryImpl
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
    controllers: [ToiletController],
})
export class ToiletModule {}