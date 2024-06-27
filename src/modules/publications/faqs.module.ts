import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "../../authentification/authentification.service";
import { FaqController } from "../../controllers/controllers/publications/faq.controller";
import { faqs } from "../../database/entities/faqs.entity";
import { images } from "../../database/entities/images.entity";
import { publication_details } from "../../database/entities/publication_details.entity";
import { users } from "../../database/entities/users.entity";
import { FaqRepositoryImpl } from "../../database/repositories/publications/faq.repository.impl";
import { UserRepositoryImpl } from "../../database/repositories/users.repository.impl";
import { FaqService } from "../../services/publication/faq.service";
import { RoleService } from "../../services/user/role.service";
import { UserService } from "../../services/user/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([publication_details]),
        TypeOrmModule.forFeature([images]),
        TypeOrmModule.forFeature([users]),
        TypeOrmModule.forFeature([faqs]),
    ],
    providers: [
        FaqService,
        {
            provide: 'FaqRepository',
            useClass: FaqRepositoryImpl
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
    controllers: [FaqController],
})
export class FaqsModule {}