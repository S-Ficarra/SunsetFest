import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { BandController } from "src/controllers/band.controller";
import { bands } from "src/database/entities/bands.entity";
import { images } from "src/database/entities/images.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { users } from "src/database/entities/users.entity";
import { BandRepositoryImpl } from "src/database/repositories/program/bands.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { BandService } from "src/services/band/band.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([bands]),
        TypeOrmModule.forFeature([publication_details]),
        TypeOrmModule.forFeature([images]),
        TypeOrmModule.forFeature([users])],
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