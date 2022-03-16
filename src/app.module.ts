import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./modules/user/user.model";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./configProvider";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
            ...databaseConfig.development,
            autoLoadModels: true,
            synchronize: true,
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
