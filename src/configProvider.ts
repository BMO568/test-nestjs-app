import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as dotenv from "dotenv";
import { Dialect } from "sequelize/types";

dotenv.config();

export interface IDatabaseConfig {
    development: SequelizeModuleOptions;
}

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT as Dialect,
    },
} as const;

export const serverPort = Number(process.env.SERVER_PORT) || 3000;
