import { ApplicationException } from './ApplicationException'

export class NotFoundException extends ApplicationException {
  constructor(readonly message: string) {
    super(message)
  }
}
