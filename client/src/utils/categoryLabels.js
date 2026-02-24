export const CATEGORY_LABELS = {
  Shopify: {
    en: 'Shopify Store',
    ar: 'متاجر شوبيفاي'
  },
  Automation: {
    en: 'Automation & AI',
    ar: 'الأتمتة والذكاء الاصطناعي'
  },
  Systems: {
    en: 'Systems & Data',
    ar: 'الأنظمة والبيانات'
  }
};

export const PRIMARY_CATEGORIES = ['Shopify', 'Automation', 'Systems'];

export const getCategoryLabel = (category, language = 'en') => {
  return CATEGORY_LABELS[category]?.[language] || category || '';
};
