import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../authentification/authentification.service";
import { BandController } from "../controllers/controllers/band.controller";
import { bands } from "../database/entities/bands.entity";
import { images } from "../database/entities/images.entity";
import { publication_details } from "../database/entities/publication_details.entity";
import { users } from "../database/entities/users.entity";
import { BandRepositoryImpl } from "../database/repositories/program/bands.repository.impl";
import { UserRepositoryImpl } from "../database/repositories/users.repository.impl";
import { BandService } from "../services/band/band.service";
import { RoleService } from "../services/user/role.service";
import { UserService } from "../services/user/user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([bands]),
        TypeOrmModule.forFeature([publication_details]),
        TypeOrmModule.forFeature([images]),
        TypeOrmModule.forFeature([users])
    ],
    providers: [
        BandService, 
        {
            provide: 'BandRepository',
            useClass: BandRepositoryImpl,
        },
        UserService, {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
        RoleService,
        AuthentificationService,
        JwtService,
    ],
    controllers: [BandController],
})
export class BandModule {}