namespace NodeJS {
  interface ProcessEnv {
    PORT?: number
    NODE_ENV?: 'development' | 'production'
    HASH_SECRET?: string
    MAIL_PASS: string
    MAIL_USER: string
    MAIL_FROM: string
    MAIL_HOST: string
    MAIL_PORT: string
  }
}

namespace globalThis {
  var prisma: import('@prisma/client').PrismaClient | undefined
  var translation: 'ptBR' | 'enUS' | undefined
}

type Translation = {
  [key: string]: string | Translation
}

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K & string}${T[K] extends object ? '.' : ''}${DeepKeys<T[K]>}`
        : never
    }[keyof T]
  : ''
