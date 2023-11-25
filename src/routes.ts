import { HomeController } from './controllers/home'
import { Router } from './lib/router/types'

export const routes: Router = [
  {
    handler: HomeController.helloWorld,
    path: '/v1/hello-world',
    method: 'get'
  }
]
