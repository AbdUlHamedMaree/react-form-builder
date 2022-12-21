import type { FieldError } from 'react-hook-form';

export const exposeMessage = (err?: FieldError, name?: string, label?: unknown) => {
  if (!err || !name) return undefined;
  if (!err.message) return 'error with no message';
  if (!label || typeof label !== 'string') return err.message;

  return err.message.replace(new RegExp(name, 'ig'), label);
};
