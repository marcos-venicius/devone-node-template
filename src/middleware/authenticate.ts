import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedException } from '~/exceptions/UnauthorizedException'
import { t } from '~/lib/i18n/t'

export function authenticate(req: Request, _: Response, next: NextFunction) {
  const token = String(req.header('Authorization'))

  if (!token || !token.startsWith('Bearer ')) {
    throw new UnauthorizedException(t('errors.generic.unauthorized'))
  }

  const jwtToken = token.replace('Bearer ', '').trim()

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET) as any

    req.user = decodedToken

    next()
  } catch (err) {
    throw new UnauthorizedException(t('errors.generic.invalid_auth_token'))
  }
}
