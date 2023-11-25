import { createHmac } from 'node:crypto'

export function hash(text: string) {
  return createHmac('sha256', process.env.HASH_SECRET ?? '')
    .update(text)
    .digest('hex')
}
