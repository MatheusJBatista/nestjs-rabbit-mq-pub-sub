import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SendMessageUseCase } from './use-cases/send-message.use-case'
import { PublisherController } from './controllers/publisher.controller'
import { GenerateSchedulingQueue } from './infra/generate-scheduling.queue'

export const GENERATE_SCHEDULING_SERVICE_NAME = 'RMQ_PUBLISHER'

@Module({
  providers: [SendMessageUseCase, GenerateSchedulingQueue],
  controllers: [PublisherController],
  imports: [
    ClientsModule.register([
      {
        name: GENERATE_SCHEDULING_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://{username}:{password}@{host}:{port}'],
          queue: 'generate-scheduling',
          queueOptions: {
            autoDelete: true,
          },
        },
      },
    ]),
  ],
})
export class ProducerModule {}
