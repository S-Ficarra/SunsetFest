import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { NewsController } from "src/controllers/news.controller";
import { images } from "src/database/entities/images.entity";
import { publication_contents } from "src/database/entities/publication_contents.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { publication_types } from "src/database/entities/publication_types.entity";
import { publications } from "src/database/entities/publications.entity";
import { users } from "src/database/entities/users.entity";
import { NewsRepositoryImpl } from "src/database/repositories/publications/news.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { NewsService } from "src/services/publication/news.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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