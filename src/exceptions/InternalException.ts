import { ApplicationException } from './ApplicationException'

export class InternalException extends ApplicationException {
  constructor(readonly message: string) {
    super(message)
  }
}
