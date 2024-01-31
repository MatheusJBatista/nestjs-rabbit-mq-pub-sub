import { Module } from '@nestjs/common'
import { SubscriberModule } from './consumer/consumer.module'
import { ProducerModule } from './producer/producer.module'

@Module({
  imports: [ProducerModule, SubscriberModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
