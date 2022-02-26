import { FieldError } from 'react-hook-form';

export const exposeMessage = (err: FieldError, name: string, label?: string) => {
  // eslint-disable-next-line no-nested-ternary
  return err.message
    ? label
      ? err.message.replace(new RegExp(name, 'ig'), label)
      : err.message
    : 'error with no message';
};
