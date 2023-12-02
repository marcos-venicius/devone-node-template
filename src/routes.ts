import { HomeController } from './controllers/home'

export const routes: AppRouter.Routes = [
  {
    handler: HomeController.helloWorld,
    path: '/v1/hello-world',
    method: 'get'
  }
]
