import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { VipController } from "src/controllers/controllers/facilities/vip.controller";
import { locations } from "src/database/entities/locations.entity";
import { users } from "src/database/entities/users.entity";
import { vips } from "src/database/entities/vips.entity";
import { VipRepositoryImpl } from "src/database/repositories/facility/vip.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { VipService } from "src/services/facility/vip.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";



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