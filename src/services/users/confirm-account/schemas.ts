import { z } from 'zod'
import { t } from '~/lib/i18n/t'

export const confirmUserAccountSchema = () =>
  z.object({
    email: z
      .string({ required_error: t('errors.generic.required') })
      .trim()
      .email(t('errors.specifc.invalid_email')),
    code: z
      .string({ required_error: t('errors.generic.required') })
      .trim()
      .length(32, t('errors.specifc.invalid_code'))
  })
