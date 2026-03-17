const ARABIC_CHAR_PATTERN = /[\u0600-\u06FF]/;
const MOJIBAKE_PATTERN = /(?:Ã.|Ø.|Ù.|â.)/;

const normalizeLocalizedString = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const normalized = value.trim();
  if (!normalized) {
    return '';
  }

  if (!ARABIC_CHAR_PATTERN.test(normalized) && MOJIBAKE_PATTERN.test(normalized)) {
    return '';
  }

  return normalized;
};

const normalizeLocalizedArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(normalizeLocalizedString).filter(Boolean);
};

export const getLocalizedText = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') {
    return normalizeLocalizedString(value) || fallback;
  }

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const localized = normalizeLocalizedString(value[language]);
  if (localized) {
    return localized;
  }

  const english = normalizeLocalizedString(value.en);
  if (english) {
    return english;
  }

  const arabic = normalizeLocalizedString(value.ar);
  if (arabic) {
    return arabic;
  }

  return fallback;
};

export const getLocalizedArray = (value, language = 'en') => {
  if (!value || typeof value !== 'object') {
    return [];
  }

  const localized = normalizeLocalizedArray(value[language]);
  if (localized.length > 0) {
    return localized;
  }

  const english = normalizeLocalizedArray(value.en);
  if (english.length > 0) {
    return english;
  }

  return normalizeLocalizedArray(value.ar);
};

export const isArabicLanguage = (language) => language === 'ar';
