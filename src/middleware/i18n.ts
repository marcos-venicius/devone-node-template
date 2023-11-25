import { NextFunction, Request, Response } from 'express'
import { isValidTranslation } from '~/lib/i18n/is-valid-translation'

export function i18n(req: Request, _: Response, next: NextFunction) {
  const lang = req.query?.lang

  if (lang && typeof lang === 'string' && isValidTranslation(lang)) {
    globalThis.translation = lang as any
  } else {
    globalThis.translation = 'ptBR'
  }

  next()
}
