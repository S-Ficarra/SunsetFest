import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { VipController } from "../../controllers/controllers/facilities/vip.controller";
import { locations } from "../../database/entities/locations.entity";
import { users } from "../../database/entities/users.entity";
import { vips } from "../../database/entities/vips.entity";
import { VipRepositoryImpl } from "../../database/repositories/facility/vip.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { VipService } from "../../services/facility/vip.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([vips]),
        TypeOrmModule.forFeature([locations]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        VipService,
        {
            provide: 'VipRepository',
            useClass: VipRepositoryImpl,
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
    controllers: [VipController],
})
export class VipModule {}