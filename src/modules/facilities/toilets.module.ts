import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { ToiletController } from "src/controllers/controllers/facilities/toilets.controller";
import { locations } from "src/database/entities/locations.entity";
import { toilets } from "src/database/entities/toilets.entity";
import { users } from "src/database/entities/users.entity";
import { ToiletRepositoryImpl } from "src/database/repositories/facility/toilets.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { ToiletService } from "src/services/facility/toilet.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";



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