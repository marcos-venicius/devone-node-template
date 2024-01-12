import jwt from 'jsonwebtoken'
import { BadRequestException } from '~/exceptions/BadRequestException'
import { UnauthorizedException } from '~/exceptions/UnauthorizedException'
import { db } from '~/lib/db'
import { hash } from '~/lib/hash'
import { t } from '~/lib/i18n/t'
import { userLoginSchema } from './schemas'

export class UserLoginService {
  constructor(private readonly body: UserLoginService.Body) {
    this.body = userLoginSchema().parse(body)
  }

  private async user() {
    return await db.user.findUnique({
      where: {
        email: this.body.email,
        password: hash(this.body.password)
      },
      select: {
        emailConfirmedAt: true,
        name: true,
        id: true
      }
    })
  }

  public async execute() {
    const user = await this.user()

    if (!user) throw new UnauthorizedException(t('errors.specifc.invalid_credentials'))

    if (!user.emailConfirmedAt) throw new BadRequestException(t('errors.generic.confirm_your_account'))

    const EIGHT_HOURS_IN_SECONDS = 8 * 60 * 60

    return jwt.sign(
      {
        email: this.body.email,
        id: user.id,
        name: user.name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: EIGHT_HOURS_IN_SECONDS,
        algorithm: 'HS256'
      }
    )
  }
}

export namespace UserLoginService {
  export type Body = {
    email: string
    password: string
  }
}
