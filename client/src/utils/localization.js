export const getLocalizedText = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized || fallback;
  }

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const localized = typeof value[language] === 'string' ? value[language].trim() : '';
  if (localized) {
    return localized;
  }

  const english = typeof value.en === 'string' ? value.en.trim() : '';
  if (english) {
    return english;
  }

  const arabic = typeof value.ar === 'string' ? value.ar.trim() : '';
  if (arabic) {
    return arabic;
  }

  return fallback;
};

export const getLocalizedArray = (value, language = 'en') => {
  if (!value || typeof value !== 'object') {
    return [];
  }

  const localized = Array.isArray(value[language]) ? value[language] : [];
  if (localized.length > 0) {
    return localized.filter((item) => typeof item === 'string' && item.trim().length > 0);
  }

  const english = Array.isArray(value.en) ? value.en : [];
  if (english.length > 0) {
    return english.filter((item) => typeof item === 'string' && item.trim().length > 0);
  }

  const arabic = Array.isArray(value.ar) ? value.ar : [];
  return arabic.filter((item) => typeof item === 'string' && item.trim().length > 0);
};

export const isArabicLanguage = (language) => language === 'ar';
