import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class GenerateScheduleController {
  @MessagePattern('generate-scheduling')
  async generateSchedules(@Payload() data: string, @Ctx() context: RmqContext) {
    try {
      const channel = context.getChannelRef()
      const originalMsg = context.getMessage()

      // do something

      console.log(data)

      channel.ack(originalMsg)
    } catch (error) {
      console.log(error)
    }
  }
}
