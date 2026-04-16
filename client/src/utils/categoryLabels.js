export const CATEGORY_LABELS = {
  Shopify: {
    en: 'Shopify Store',
    ar: 'متاجر Shopify'
  },
  Portfolio: {
    en: 'Portfolio Sites',
    ar: 'مواقع البورتفوليو'
  },
  Automation: {
    en: 'Automation & AI',
    ar: 'الأتمتة والذكاء الاصطناعي'
  },
  Systems: {
    en: 'Systems & Data',
    ar: 'الأنظمة والبيانات'
  },
  Design: {
    en: 'UI/UX Design',
    ar: 'تصميم UI/UX'
  }
};

export const PRIMARY_CATEGORIES = ['Shopify', 'Portfolio', 'Systems', 'Design', 'Automation'];

export const getCategoryLabel = (category, language = 'en') => {
  return CATEGORY_LABELS[category]?.[language] || category || '';
};
