import { Module } from '@nestjs/common';
import { AuthentificationService } from '../authentification/authentification.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../authentification/jwt.strategy';
import { AuthentificationController } from 'src/controllers/authentification.controller';
import { UserService } from 'src/services/user/user.service';
import { UserRepositoryImpl } from 'src/database/repositories/users.repository.impl';
import { RoleService } from 'src/services/user/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/database/entities/users.entity';
require('dotenv').config();



@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' }, 
    }),
    TypeOrmModule.forFeature([users]),
  ],
  controllers: [AuthentificationController], 
  providers: [
    AuthentificationService, 
    JwtStrategy, 
    UserService, {
        provide: 'UserRepository',
        useClass: UserRepositoryImpl,
    },
    RoleService]
})
export class AuthModule {}
