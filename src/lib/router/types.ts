export type RouteMethods = 'post' | 'get' | 'put' | 'delete' | 'patch'

export type Route = {
  path: `/v${number}/${string}`
  method: RouteMethods
  authenticated?: boolean
  handler: RequestHandler
}

export type Router = Array<Route>
