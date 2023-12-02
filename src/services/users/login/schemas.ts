import { z } from 'zod'
import { t } from '~/lib/i18n/t'

export const userLoginSchema = () =>
  z.object({
    email: z
      .string({ required_error: t('errors.generic.required') })
      .trim()
      .email(t('errors.specifc.invalid_email')),
    password: z
      .string({ required_error: t('errors.generic.required') })
      .min(8, t('errors.generic.too_short', 8))
  })
