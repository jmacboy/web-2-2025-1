import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "*",
    });
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder().addBearerAuth().setTitle("Api de prueba").setDescription("Descripción del API de prueba").setVersion("1.0").build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
