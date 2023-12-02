import { errorDispatcher } from '~/middleware/error-dispatcher'
import { Router as ExpressRouter } from 'express'

export default function router(routes: AppRouter.Routes) {
  const router = ExpressRouter()

  for (const route of routes) router[route.method](route.path, errorDispatcher(route.handler))

  return router
}
