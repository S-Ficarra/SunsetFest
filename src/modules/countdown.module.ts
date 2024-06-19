import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { CountdownController } from "src/controllers/countdown.controller";
import { countdowns } from "src/database/entities/countdowns.entity";
import { users } from "src/database/entities/users.entity";
import { CountdownRepositoryImpl } from "src/database/repositories/countdown.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { CountdownService } from "src/services/countdown.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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