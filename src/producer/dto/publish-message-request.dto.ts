import { Allow, IsString } from 'class-validator'

export class PublishMessageRequestDto {
  @Allow()
  @IsString()
  message: string
}
