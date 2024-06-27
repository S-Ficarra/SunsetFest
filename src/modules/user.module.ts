import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/controllers/user.controller';
import { RoleService } from '../services/user/role.service';
import { UserService } from '../services/user/user.service';
import { users } from '../database/entities/users.entity';
import { UserRepositoryImpl } from '../database/repositories/users.repository.impl';
import { AuthentificationService } from '../authentification/authentification.service';
import { JwtService } from '@nestjs/jwt';




@Module({
    imports: [TypeOrmModule.forFeature([users])],
    providers: [
        UserService,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
        RoleService, 
        AuthentificationService,
        JwtService,
    ],
    controllers: [UserController],
})
export class UserModule {}
