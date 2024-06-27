import { DataSource } from "typeorm";
require('dotenv').config();


export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "sunset_fest",
    entities: ["./dist/src/database/entities/*{.js,.ts}"],
    synchronize: true,
    logging: false,
  });

