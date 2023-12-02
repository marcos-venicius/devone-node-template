import { ConfirmUserAccountService } from '~/services/users/confirm-account'
import { CreateUserService } from '~/services/users/create'
import { UserLoginService } from '~/services/users/login'
import { SendUserConfirmationCodeService } from '~/services/users/send-confirmation-code'

export class UsersController {
  public static createUser: AppRouter.RequestHandler = async (req, res) => {
    const createUserService = new CreateUserService(req.body)

    const userId = await createUserService.execute()

    return res.status(201).json({
      id: userId
    })
  }

  public static sendConfirmationCode: AppRouter.RequestHandler = async (req, res) => {
    const sendUserConfirmationCodeService = new SendUserConfirmationCodeService(req.body)

    await sendUserConfirmationCodeService.execute()

    return res.status(204).end()
  }

  public static confirmUserAccount: AppRouter.RequestHandler = async (req, res) => {
    const confirmUserAccountService = new ConfirmUserAccountService(req.body)

    await confirmUserAccountService.execute()

    return res.status(204).end()
  }

  public static userLogin: AppRouter.RequestHandler = async (req, res) => {
    const userLoginService = new UserLoginService(req.body)

    const token = await userLoginService.execute()

    return res.status(200).json({
      token
    })
  }
}
