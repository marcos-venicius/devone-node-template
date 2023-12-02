import { db } from '~/lib/db'
import { createUserSchema } from './schemas'
import { BadRequestException } from '~/exceptions/BadRequestException'
import { t } from '~/lib/i18n/t'
import { hash } from '~/lib/hash'
import { SendUserConfirmationCodeService } from '../send-confirmation-code'

export class CreateUserService {
  private readonly sendUserConfirmationCodeService: SendUserConfirmationCodeService

  constructor(private readonly body: CreateUserService.Body) {
    this.body = createUserSchema().parse(body)

    this.sendUserConfirmationCodeService = new SendUserConfirmationCodeService({
      email: body.email
    })
  }

  private async validateDuplicatedEmail() {
    const results = await db.user.count({
      where: {
        email: this.body.email
      }
    })

    if (results > 0) throw new BadRequestException(t('errors.generic.duplicated_email'))
  }

  private async createUser() {
    const { id } = await db.user.create({
      data: {
        name: this.body.name,
        email: this.body.email,
        password: hash(this.body.password)
      },
      select: {
        id: true
      }
    })

    return id
  }

  public async execute() {
    await this.validateDuplicatedEmail()

    const id = await this.createUser()

    await this.sendUserConfirmationCodeService.execute()

    return id
  }
}

export namespace CreateUserService {
  export type Body = {
    name: string
    email: string
    password: string
  }
}
