import { Module } from '@nestjs/common';
import { AuthentificationService } from '../authentification/authentification.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../authentification/jwt.strategy';
import { AuthentificationController } from '../controllers/controllers/authentification.controller';
import { UserService } from '../services/user/user.service';
import { UserRepositoryImpl } from '../database/repositories/users.repository.impl';
import { RoleService } from '../services/user/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../database/entities/users.entity';
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
