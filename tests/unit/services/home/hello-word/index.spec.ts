import { HomeHelloWorldService } from '~/services/home/hello-world'

describe('HelloWorldService', () => {
  it('should return "Hello, World!" when without params', () => {
    const helloWorldService = new HomeHelloWorldService({})

    const result = helloWorldService.execute()

    expect(result).toBe('Hello, World!')
  })

  it('should return "Hello, Marcos!" when param "who" is specified as "Marcos"', () => {
    const helloWorldService = new HomeHelloWorldService({
      who: "Marcos"
    })

    const result = helloWorldService.execute()

    expect(result).toBe('Hello, Marcos!')
  })
})
