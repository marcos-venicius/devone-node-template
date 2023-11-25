import { ApplicationException } from './ApplicationException'

export class BadRequestException extends ApplicationException {
  constructor(readonly message: string) {
    super(message)
  }
}
