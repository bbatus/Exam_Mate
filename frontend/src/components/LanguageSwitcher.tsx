import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-300">{t('common.language')}:</span>
      <div className="flex space-x-1">
        <button
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === 'tr'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => changeLanguage('tr')}
        >
          TR
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 