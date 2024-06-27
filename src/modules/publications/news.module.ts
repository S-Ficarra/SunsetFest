import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { NewsController } from "../../controllers/controllers/publications/news.controller";
import { images } from "../../database/entities/images.entity";
import { publication_contents } from "../../database/entities/publication_contents.entity";
import { publication_details } from "../../database/entities/publication_details.entity";
import { publication_types } from "../../database/entities/publication_types.entity";
import { publications } from "../../database/entities/publications.entity";
import { users } from "../../database/entities/users.entity";
import { NewsRepositoryImpl } from "../../database/repositories/publications/news.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { NewsService } from "../../services/publication/news.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([publication_types]),
        TypeOrmModule.forFeature([publications]),
        TypeOrmModule.forFeature([publication_contents]),
        TypeOrmModule.forFeature([publication_details]),
        TypeOrmModule.forFeature([images]),
        TypeOrmModule.forFeature([users]),
    ],
    providers: [
        NewsService,
        {
            provide: 'NewsRepository',
            useClass: NewsRepositoryImpl
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
    controllers: [NewsController],
})
export class NewsModule {}