import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from "./database/ormconfig"
import "reflect-metadata";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

AppDataSource.initialize()
    .then(() => {
      console.log('Database connected succefully');
    })
    .catch((error) => console.log(error))
