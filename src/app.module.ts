import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/authentification.module';
import { BandModule } from './modules/band.module';
import { NewsModule } from './modules/news.module';
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
  ],
})
export class AppModule {}