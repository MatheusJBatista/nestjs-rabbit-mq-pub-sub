import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('POC Pub/Sub RabbitMQ')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  )

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: ['amqps://{username}:{password}@{host}:{port}'],
      queue: 'generate-scheduling',
    },
  })

  await app.startAllMicroservices()

  await app.listen(3000)
}
bootstrap()
