import { errorDispatcher } from '~/middleware/error-dispatcher'
import { Router } from './types'
import { Router as ExpressRouter } from 'express'

export default function router(router: Router) {
  const routes = ExpressRouter()

  for (const route of router) {
    if (route?.authenticated) {
      // create the authenticate middleware
      // routes[route.method](route.path, authenticate, errorDispatcher(route.handler))
    } else {
      routes[route.method](route.path, errorDispatcher(route.handler))
    }
  }

  return routes
}
