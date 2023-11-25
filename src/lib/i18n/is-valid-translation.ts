import translations from './translations'

export function isValidTranslation(translation: string) {
  return translation in translations
}
