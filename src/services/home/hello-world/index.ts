import { homeHelloWorldSchema } from './schemas'

export class HomeHelloWorldService {
  constructor(private readonly payload: HomeHelloWorldService.Input) {
    this.payload = homeHelloWorldSchema().parse(payload)
  }

  public execute() {
    return `Hello ${this.payload.who || 'World'}`
  }
}

export namespace HomeHelloWorldService {
  export type Input = {
    who?: string | null
  }
}
