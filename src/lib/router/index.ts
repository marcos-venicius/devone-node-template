import { errorDispatcher } from '~/middleware/error-dispatcher'
import { Router as ExpressRouter } from 'express'
import { authenticate } from '~/middleware/authenticate'

export default function router(routes: AppRouter.Routes) {
  const router = ExpressRouter()

  for (const route of routes) {
    if (route?.authenticated) {
      router[route.method](route.path, authenticate, errorDispatcher(route.handler))
    } else {
      router[route.method](route.path, errorDispatcher(route.handler))
    }
  }

  return router
}
