import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ApplicationException } from '~/exceptions/ApplicationException'
import { BadRequestException } from '~/exceptions/BadRequestException'
import { NotFoundException } from '~/exceptions/NotFoundException'
import { t } from '~/lib/i18n/t'
import { mapZodErrors } from '~/utils/map-zod-errors'

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApplicationException) {
    if (err instanceof NotFoundException) {
      return res.status(404).json({ message: err.message })
    }

    if (err instanceof BadRequestException) {
      return res.status(400).json({
        message: err.message
      })
    }

    return res.status(500).json({
      message: t('errors.generic.unexpected_error')
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: t('errors.generic.invalid_fields'),
      errors: mapZodErrors(err)
    })
  }

  if (process.env.NODE_ENV === 'development') console.error(err)

  return res.status(500).json({
    message: t('errors.generic.internal_server_error')
  })
}
