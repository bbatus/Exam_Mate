import { TFunction } from 'react-i18next';

/**
 * Get translated exam title based on current language
 * @param originalTitle - Original exam title from database
 * @param t - Translation function from react-i18next
 * @returns Translated exam title or original title if translation not found
 */
export const getTranslatedExamTitle = (originalTitle: string, t: TFunction): string => {
  // Try to get translation from examTitles namespace
  const translationKey = `examTitles.${originalTitle}`;
  const translatedTitle = t(translationKey);
  
  // If translation exists and is different from the key, return it
  if (translatedTitle !== translationKey) {
    return translatedTitle;
  }
  
  // Otherwise return the original title
  return originalTitle;
};

/**
 * Check if exam title contains Turkish difficulty levels and needs translation
 * @param title - Exam title to check
 * @returns boolean indicating if title needs translation
 */
export const needsTranslation = (title: string): boolean => {
  const turkishKeywords = ['Orta Seviye', 'Başlangıç', 'İleri', 'Temel', 'Uzman'];
  return turkishKeywords.some(keyword => title.includes(keyword));
};
