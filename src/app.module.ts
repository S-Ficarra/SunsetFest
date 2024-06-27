import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/authentification.module';
import { BandModule } from './modules/band.module';
import { NewsModule } from './modules/publications/news.module';
import { InformationModule } from './modules/publications/information.module';
import { FaqsModule } from './modules/publications/faqs.module';
import { ToiletModule } from './modules/facilities/toilets.module';
import { CampingModule } from './modules/facilities/camping.module';
import { VipModule } from './modules/facilities/vip.module';
import { StageModule } from './modules/facilities/stages.module';
import { CountdownModule } from './modules/countdown.module';
import { BarModule } from './modules/facilities/bar.module';
import { RestaurantModule } from './modules/facilities/restaurant.module';
import { MerchandisingModule } from './modules/facilities/merchandising.module';
import { PerformanceModule } from './modules/performance.module';
import { ProgramModule } from './modules/program.module';
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
    BarModule,
    RestaurantModule,
    MerchandisingModule,
    CountdownModule,
    PerformanceModule,
    ProgramModule
  ],
})
export class AppModule {}