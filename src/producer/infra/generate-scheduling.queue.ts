import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  forwardRef,
} from '@nestjs/common'
import { GENERATE_SCHEDULING_SERVICE_NAME } from '../producer.module'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class GenerateSchedulingQueue implements OnApplicationBootstrap {
  constructor(
    @Inject(forwardRef(() => GENERATE_SCHEDULING_SERVICE_NAME))
    public client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect()

    console.log('RMQ Connected successfully')
  }
}
