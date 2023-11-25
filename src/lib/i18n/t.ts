import translations from './translations'

type Key = DeepKeys<typeof translations.ptBR>

function getTranslation(key: Key) {
  const path = key.split('.')

  const translation = globalThis.translation
    ? translations[globalThis.translation]
    : translations.ptBR

  let current: Translation = translation

  for (const chunk of path) {
    if (!(chunk in current)) return key

    if (typeof current[chunk] === 'object') {
      current = current[chunk] as Translation
    } else if (chunk !== path[path.length - 1]) {
      return key
    } else {
      return current[chunk] as string
    }
  }

  return key
}

export function t(key: Key, ...tokens: (string | number)[]) {
  let translation = getTranslation(key)

  for (let i = 0; i < tokens.length; i++) {
    const tokenToFind = `{${i}}`

    translation = translation.replace(tokenToFind, String(tokens[i]))
  }

  return translation
}
