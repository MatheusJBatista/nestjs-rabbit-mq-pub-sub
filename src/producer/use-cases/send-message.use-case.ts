import { Injectable } from '@nestjs/common'
import { GenerateSchedulingQueue } from '../infra/generate-scheduling.queue'

@Injectable()
export class SendMessageUseCase {
  constructor(private generateSchedulingQueue: GenerateSchedulingQueue) {}

  async execute(message: string) {
    this.generateSchedulingQueue.client
      .send('generate-scheduling', message)
      .subscribe()
  }
}
