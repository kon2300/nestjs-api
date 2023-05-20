import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/appModule';
import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = process.env.API_PORT || 3000;

  await app.listen(port);
}
bootstrap();
