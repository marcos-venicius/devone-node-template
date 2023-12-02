import { z } from 'zod'
import { t } from '~/lib/i18n/t'

export const sendUserConfirmationCodeSchema = () =>
  z.object({
    email: z
      .string({
        required_error: t('errors.generic.required')
      })
      .trim()
      .email(t('errors.specifc.invalid_email'))
  })
