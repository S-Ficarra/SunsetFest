import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthentificationService } from "src/authentification/authentification.service";
import { FaqController } from "src/controllers/faq.controller";
import { faqs } from "src/database/entities/faqs.entity";
import { images } from "src/database/entities/images.entity";
import { publication_details } from "src/database/entities/publication_details.entity";
import { users } from "src/database/entities/users.entity";
import { FaqRepositoryImpl } from "src/database/repositories/publications/faq.repository.impl";
import { UserRepositoryImpl } from "src/database/repositories/users.repository.impl";
import { FaqService } from "src/services/publication/faq.service";
import { RoleService } from "src/services/user/role.service";
import { UserService } from "src/services/user/user.service";


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