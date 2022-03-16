import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { serverPort } from "./configProvider";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api/v1");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle("Test example")
        .setDescription("The test API description")
        .setVersion("1.0")
        .setBasePath("api/v1")
        .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "JWT")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/swagger", app, document);

    await app.listen(serverPort);
}
bootstrap();
