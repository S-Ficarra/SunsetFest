import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/authentification.module';
import { BandModule } from './modules/band.module';
import { NewsModule } from './modules/news.module';
import { InformationModule } from './modules/information.module';
import { FaqsModule } from './modules/faqs.module';
import { ToiletModule } from './modules/toilets.module';
import { CampingModule } from './modules/camping.module';
import { VipModule } from './modules/vip.module';
import { StageModule } from './modules/stages.module';
import { CountdownModule } from './modules/countdown.module';
import { BarModule } from './modules/bar.module';
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "sunset_fest",
      entities: ["./dist/src/database/entities/*{.js,.ts}"],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    AuthModule,
    BandModule,
    NewsModule,
    InformationModule,
    FaqsModule,
    ToiletModule,
    CampingModule,
    VipModule,
    StageModule,
    CountdownModule,
    BarModule,
  ],
})
export class AppModule {}