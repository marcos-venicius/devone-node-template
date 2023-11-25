import ptBr from './pt-br'

const translation: typeof ptBr = {
  errors: {
    generic: {
      required: 'Required field',
      too_short: 'This field should have at min {0} characters',
      internal_server_error: 'Internal server error',
      unexpected_error: 'An unexpected error occurred',
      invalid_fields: 'Invalid fields',
      not_found: '{0} not found'
    }
  }
}

export default translation
