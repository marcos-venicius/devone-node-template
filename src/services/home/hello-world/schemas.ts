import { z } from 'zod'

export const homeHelloWorldSchema = () =>
  z.object({
    who: z.string().optional().nullable()
  })
