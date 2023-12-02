import { NextFunction, Request, Response } from 'express'

export const errorDispatcher =
  <T>(fn: AppRouter.RequestHandler<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res)
    } catch (err) {
      return next(err)
    }
  }
