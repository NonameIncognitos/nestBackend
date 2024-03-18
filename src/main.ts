import { NestFactory } from "@nestjs/core"
import { AppModule } from "./appModule"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
require('dotenv').config()
async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Уроки BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Asan')
        .build()
    

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)


    await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT -  ${PORT}`))
}

start()