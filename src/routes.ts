import { HomeController } from './controllers/home'
import { UsersController } from './controllers/users'

export const routes: AppRouter.Routes = [
  // HOME

  {
    handler: HomeController.helloWorld,
    path: '/v1/hello-world',
    authenticated: true,
    method: 'get'
  },

  // USERS

  {
    handler: UsersController.createUser,
    method: 'post',
    path: '/v1/users'
  },
  {
    handler: UsersController.sendConfirmationCode,
    method: 'post',
    path: '/v1/users/send-confirmation-code'
  },
  {
    handler: UsersController.confirmUserAccount,
    method: 'post',
    path: '/v1/users/confirm-account'
  },
  {
    handler: UsersController.userLogin,
    method: 'post',
    path: '/v1/users/login'
  }
]
