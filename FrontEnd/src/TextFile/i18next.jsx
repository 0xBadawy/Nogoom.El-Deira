import i18next from 'i18next';

// استيراد النصوص
import en from '../../public/locales/en.json';
import ar from '../../public/locales/ar.json';

i18next.init({
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'en', // اللغة الاحتياطية
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    }
  });
  
  // استخدام الترجمة
  console.log(i18next.t('navbar.home')); // الناتج: "الرئيسية"
  console.log(i18next.t('footer.terms')); // الناتج: "الشروط والأحكام"