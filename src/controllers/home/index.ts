import { HomeHelloWorldService } from '~/services/home/hello-world'

export class HomeController {
  public static helloWorld: AppRouter.RequestHandler = async (req, res) => {
    const homeHelloWorldService = new HomeHelloWorldService(req.query)

    const message = homeHelloWorldService.execute()

    return res.status(200).json({
      message
    })
  }
}
