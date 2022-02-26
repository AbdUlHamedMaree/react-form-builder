const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString =
  typeof Symbol !== 'undefined' ? Symbol.prototype.toString : () => '';
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

const printNumber = (val: number) => {
  if (val !== +val) return 'NaN';
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : `${val}`;
};

const printSimpleValue = (val: any, quoteStrings = false) => {
  if (val == null || val === true || val === false) return `${val}`;
  const typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? `"${val}"` : val;
  if (typeOf === 'function') return `[Function ${val.name || 'anonymous'}]`;
  if (typeOf === 'symbol')
    return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  const tag = toString.call(val).slice(8, -1);
  if (tag === 'Date')
    return Number.isNaN(val.getTime()) ? `${val}` : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return `[${errorToString.call(val)}]`;
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
};

export const printValue = (value: any, quoteStrings: boolean) => {
  const result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(
    value,
    // eslint-disable-next-line func-names
    function (key, val) {
      const res = printSimpleValue(this?.[key], quoteStrings);
      if (res !== null) return res;
      return val;
    },
    2
  );
};
