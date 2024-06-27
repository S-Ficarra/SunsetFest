import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../authentification/authentification.service";
import { CountdownController } from "../controllers/controllers/countdown.controller";
import { countdowns } from "../database/entities/countdowns.entity";
import { users } from "../database/entities/users.entity";
import { CountdownRepositoryImpl } from "../database/repositories/countdown.repository.impl";
import { UserRepositoryImpl } from "../database/repositories/users.repository.impl";
import { CountdownService } from "../services/countdown.service";
import { RoleService } from "../services/user/role.service";
import { UserService } from "../services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([countdowns]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        CountdownService,
        {
            provide: 'CountdownRepository',
            useClass: CountdownRepositoryImpl,
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
    controllers: [CountdownController],
})
export class CountdownModule {}