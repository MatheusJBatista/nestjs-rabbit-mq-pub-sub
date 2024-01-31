import { Module } from '@nestjs/common'
import { GenerateScheduleController } from './controllers/generate-schedule.controller'

@Module({
  controllers: [GenerateScheduleController],
})
export class SubscriberModule {}
