import { db } from '~/lib/db'
import { sendUserConfirmationCodeSchema } from './schemas'
import { rawUUID } from '~/utils/raw-uuid'
import { Email } from '~/lib/email'
import { t } from '~/lib/i18n/t'
import { BadRequestException } from '~/exceptions/BadRequestException'

export class SendUserConfirmationCodeService {
  constructor(private readonly payload: SendUserConfirmationCodeService.Payload) {
    this.payload = sendUserConfirmationCodeSchema().parse(payload)
  }

  private async user() {
    return await db.user.findUnique({
      where: {
        email: this.payload.email
      },
      select: {
        id: true,
        name: true,
        emailConfirmedAt: true
      }
    })
  }

  private async createConfirmationCode(userId: string, minutes = 10) {
    const code = rawUUID()
    const currentDate = new Date()
    const expirationTime = minutes * 60 * 1000
    const expiresIn = new Date(currentDate.getTime() + expirationTime)

    await db.userConfirmationCode.create({
      data: {
        userId,
        code,
        expiresIn
      }
    })

    return code
  }

  private async closeCurrentOpenConfirmationCodes(userId: string) {
    await db.userConfirmationCode.updateMany({
      where: {
        userId,
        outdated: false
      },
      data: {
        outdated: true
      }
    })
  }

  public async execute() {
    const user = await this.user()

    if (!user) return

    if (!!user.emailConfirmedAt) {
      throw new BadRequestException(t('messages.account_already_confirmed'))
    }

    await this.closeCurrentOpenConfirmationCodes(user.id)
    const confirmationCode = await this.createConfirmationCode(user.id)

    const confirmAccountEmailTemplate = await Email.readTemplate(
      t('mail.templates.confirm_account'),
      {
        '@name': user.name,
        '@confirmation-code': confirmationCode
      }
    )

    const email = new Email(this.payload.email, t('mail.subjects.confirm_account'))

    await email.send({
      html: confirmAccountEmailTemplate
    })
  }
}

export namespace SendUserConfirmationCodeService {
  export type Payload = {
    email: string
  }
}
