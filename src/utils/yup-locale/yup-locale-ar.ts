/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-template-curly-in-string */
import { printValue } from './print';

// TODO: fix with type `Yup.LocaleObject`
export const mixed = {
  default: "'${path}' غير صالح",
  required: "'${path}' حقل مطلوب",
  oneOf: "'${path}' يجب أن يكون ضمن القيم التالية: ${values}",
  notOneOf: "'${path}' يجب ان لا يكون ضمن القيم التالية: ${values}",
  notType: ({
    path,
    type,
    value,
    originalValue,
  }: {
    path: any;
    type: any;
    value: any;
    originalValue: any;
  }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${`'${path}' يجب أن يكون من النوع \`${type}\`, لكن القيمة النهائية كانت: \`${printValue(
      value,
      true
    )}\``}${isCast ? ` (حوّلت من القيمة \`${printValue(originalValue, true)}\`).` : '.'}`;

    if (value === null) {
      msg += `\n If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }

    return msg;
  },
  defined: "'${path}' يجب ان يكون محدداً",
};
export const string = {
  length: "'${path}' يجب أن يكون طوله ${length} محرفاً",
  min: "'${path}' يجب أن يكون طوله على الأقل ${min} محرفاً",
  max: "'${path}' يجب أن يكون طوله على الأكثر ${max} محرفاً",
  matches: '\'${path}\' يجب أن يطابق الصيغة التالية: "${regex}"',
  email: "'${path}' يجب أن يكون بريد إلكتروني صالح",
  url: "'${path}' يجب أن يكون رابط تشعبي صالح",
  uuid: "'${path}' يجب أن يكون معرف فريد صالح",
  trim: "'${path}' يجب ان يكون سلسلة نصية مقطوعة",
  lowercase: "'${path}' يجب أن يكون سلسلة أحرف صغيرة",
  uppercase: "'${path}' يجب أن يكون سلسلة أحرف كبيرة",
};
export const number = {
  min: "'${path}' يجب أن يكون أكبر أو يساوي ${min}",
  max: "'${path}' يجب أن يكون أصغر أو يساوي ${max}",
  lessThan: "'${path}' يجب أن يكون أصغر من ${less}",
  moreThan: "'${path}' يجب أن يكون أكبر من ${more}",
  positive: "'${path}' يجب أن يكون رقماً موجباً",
  negative: "'${path}' يجب أن يكون رقماً سالباً",
  integer: "'${path}' يجب ان يكون رقم صحيح",
};
export const date = {
  min: "'${path}' يجب أن يكون بعد تاريخ ${min}",
  max: "'${path}' يجب ان تكون قبل تاريخ ${max}",
};
export const boolean = {
  isValue: "'${path}' يجب أن يكون ${value}",
};
export const object = {
  noUnknown: "'${path}' يحتوي الحقل على مفاتيح غير محددة: ${unknown}",
};
export const array = {
  min: "'${path}' يجب أن يحتوي على الأقل على ${min} عنصراً",
  max: "'${path}' يجب أن يحتوي على أقل من أو يساوي ${max} عنصراً",
  length: "'${path}' يجب أن يحوي ${length} عنصراً",
};
