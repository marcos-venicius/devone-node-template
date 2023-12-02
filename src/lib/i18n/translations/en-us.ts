import ptBr from './pt-br'

const translation: typeof ptBr = {
  errors: {
    generic: {
      required: 'Required field',
      too_short: 'This field should have at min {0} characters',
      internal_server_error: 'Internal server error',
      unexpected_error: 'An unexpected error occurred',
      invalid_fields: 'Invalid fields',
      not_found: '{0} not found',
      unauthorized: 'Unauthorized',
      invalid_auth_token: 'Invalid token',
      duplicated_email: 'This email is already being used',
      confirm_your_account: 'Please, before login, confirm your account'
    },
    specifc: {
      invalid_email: 'Invalid email',
      invalid_code: 'Invalid confirmation code',
      expired_code: 'Expired confirmation code',
      invalid_credentials: 'User and/or password are invalid'
    }
  },
  models: {
    user: {
      capitalized: 'User'
    },
    confirmation_code: {
      capitalized: 'Confirmation code'
    }
  },
  messages: {
    account_already_confirmed: 'Your account is already confirmed'
  },
  mail: {
    subjects: {
      confirm_account: 'Confirm your account'
    },
    templates: {
      confirm_account: 'confirm-account/en-us.html'
    }
  }
}

export default translation
