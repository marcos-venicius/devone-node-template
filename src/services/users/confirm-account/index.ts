import { db } from '~/lib/db'
import { confirmUserAccountSchema } from './schemas'
import { t } from '~/lib/i18n/t'
import { BadRequestException } from '~/exceptions/BadRequestException'
import { NotFoundException } from '~/exceptions/NotFoundException'

export class ConfirmUserAccountService {
  constructor(private readonly payload: ConfirmUserAccountService.Payload) {
    this.payload = confirmUserAccountSchema().parse(payload)
  }

  private async confirmationCode(userId: string) {
    return await db.userConfirmationCode.findUnique({
      where: {
        code: this.payload.code,
        userId
      },
      select: {
        id: true,
        outdated: true,
        expiresIn: true,
        userId: true
      }
    })
  }

  private async user() {
    return await db.user.findUnique({
      where: {
        email: this.payload.email
      },
      select: {
        id: true,
        emailConfirmedAt: true
      }
    })
  }

  private async confirmUserAccount(userId: string, confirmationCodeId: string) {
    await db.$transaction([
      db.userConfirmationCode.update({
        where: {
          id: confirmationCodeId
        },
        data: {
          outdated: true
        }
      }),
      db.user.update({
        where: {
          id: userId
        },
        data: {
          emailConfirmedAt: new Date()
        }
      })
    ])
  }

  private async markConfirmationCodeAsOutdated(id: string) {
    await db.userConfirmationCode.update({
      where: {
        id
      },
      data: {
        outdated: true
      }
    })
  }

  public async execute() {
    const user = await this.user()

    if (!user) {
      throw new NotFoundException(t('errors.generic.not_found', t('models.user.capitalized')))
    }

    if (!!user.emailConfirmedAt) {
      throw new BadRequestException(t('messages.account_already_confirmed'))
    }

    const confirmationCode = await this.confirmationCode(user.id)

    if (!confirmationCode) {
      throw new NotFoundException(
        t('errors.generic.not_found', t('models.confirmation_code.capitalized'))
      )
    }

    if (confirmationCode.outdated) {
      throw new BadRequestException(t('errors.specifc.invalid_code'))
    }

    if (confirmationCode.expiresIn < new Date()) {
      await this.markConfirmationCodeAsOutdated(confirmationCode.id)

      throw new BadRequestException(t('errors.specifc.expired_code'))
    }

    await this.confirmUserAccount(user.id, confirmationCode.id)
  }
}

export namespace ConfirmUserAccountService {
  export type Payload = {
    email: string
    code: string
  }
}
