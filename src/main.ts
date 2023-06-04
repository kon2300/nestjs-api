import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/appModule';
import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('API REFERENCE')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.API_PORT || 3000;
  await app.listen(port);
}
bootstrap();
