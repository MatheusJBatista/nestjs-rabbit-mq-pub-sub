import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SendMessageUseCase } from '../use-cases/send-message.use-case'
import { PublishMessageRequestDto } from '../dto/publish-message-request.dto'

@ApiTags('publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  @Post()
  async publish(@Body() { message }: PublishMessageRequestDto) {
    await this.sendMessageUseCase.execute(message)
  }
}
