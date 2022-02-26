import * as yup from 'yup';
import * as YupArLocale from './yup-locale-ar';
import * as YupEnLocale from './yup-locale-en';

export const setLocale = (lang: 'en' | 'ar') =>
  yup.setLocale(lang === 'en' ? YupEnLocale : YupArLocale);
