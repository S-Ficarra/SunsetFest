import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountdownService } from './services/countdown/countdown.service';
import { ProgramService } from './program/program.service';
import { AuthorService } from './author/author.service';
import { UserService } from './user/user.service';
import { UserService } from './user/user.service';
import { AdministratorService } from './administrator/administrator.service';
import { UserService } from './user/user.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CountdownService, ProgramService, AuthorService, UserService, AdministratorService],
})
export class AppModule {}
