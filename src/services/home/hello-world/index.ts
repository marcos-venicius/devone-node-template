import { homeHelloWorldSchema } from './schemas'

export class HomeHelloWorldService {
  constructor(private readonly payload: HomeHelloWorldService.Input) {
    this.payload = homeHelloWorldSchema().parse(payload)
  }

  public execute() {
    if (this.payload.who) return `Hello, ${this.payload.who}!`

    return 'Hello, World!'
  }
}

export namespace HomeHelloWorldService {
  export type Input = {
    who?: string | null
  }
}
