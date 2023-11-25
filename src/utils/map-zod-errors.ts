import { ZodError } from 'zod'

export function mapZodErrors(error: ZodError) {
  const errors: { [key: string]: string[] } = {}

  for (const err of error.errors) {
    const path = err.path.join('.')

    if (!(path in errors)) errors[path] = []

    errors[path].push(err.message)
  }

  return errors
}
