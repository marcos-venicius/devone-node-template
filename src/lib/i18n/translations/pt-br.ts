export default {
  errors: {
    generic: {
      required: 'Campo obrigatório',
      too_short: 'Esse campo deve ter no minimo {0} caracteres',
      internal_server_error: 'Erro interno do servidor',
      unexpected_error: 'Um erro inesperado aconteceu',
      invalid_fields: 'Campos inválidos',
      not_found: '{0} não encontrado',
      unauthorized: 'Não autorizado',
      invalid_auth_token: 'Token inválido',
      duplicated_email: 'Este email já está sendo utilizado',
      confirm_your_account: 'Please, before login, confirm your account'
    },
    specifc: {
      invalid_email: 'Email inválido',
      invalid_code: 'Código de confirmação inválido',
      expired_code: 'Código de confirmação expirado',
      invalid_credentials: 'Usuário e/ou senha inválidos'
    }
  },
  models: {
    user: {
      capitalized: 'Usuário'
    },
    confirmation_code: {
      capitalized: 'Código de confirmação'
    }
  },
  messages: {
    account_already_confirmed: 'Sua conta já foi confirmada'
  },
  mail: {
    subjects: {
      confirm_account: 'Confirme sua conta'
    },
    templates: {
      confirm_account: 'confirm-account/pt-br.html'
    }
  }
}
