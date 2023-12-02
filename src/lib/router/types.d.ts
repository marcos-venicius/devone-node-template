namespace AppRouter {
  type RequestHandler<T = any> = (
    req: import('express').Request,
    res: import('express').Response
  ) => Promise<T>

  type Method = 'post' | 'get' | 'put' | 'delete' | 'patch'

  type Route = {
    path: `/v${number}/${string}`
    method: Method
    handler: RequestHandler
  }

  type Routes = Array<Route>
}
