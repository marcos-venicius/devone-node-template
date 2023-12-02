import { randomUUID } from 'node:crypto'

export function rawUUID() {
  const uuid = randomUUID()

  return uuid.replace(/-/g, '')
}
