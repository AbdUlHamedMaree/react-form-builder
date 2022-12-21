import { useCallback, useMemo } from 'react';
import type {
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import { object } from 'yup';
import type { AnyObject, NewUseFormProps } from '$types';
import { getFinalUseFormProps } from '$utils/get-final-use-form-props';

export type UseFormBuilderOptions<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  validation?: AnyObjectSchema;
  onSubmit?: SubmitHandler<TFieldType>;
  onError?: SubmitErrorHandler<TFieldType>;
} & NewUseFormProps<TFieldType, TContext>;

export type UseFormBuilderReturn<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  onSubmit: SubmitHandler<TFieldType>;
  onError: SubmitErrorHandler<TFieldType>;
  n: <T extends Path<TFieldType>>(path: T) => T;
} & UseFormReturn<TFieldType, TContext>;

export const useFormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  validation = object(),
  onSubmit = () => null,
  // eslint-disable-next-line no-console
  onError = (...args) => console.error(`[react-form-builder:submit-error]`, ...args),
  ...useFormProps
}: UseFormBuilderOptions<TFieldType, TContext>): UseFormBuilderReturn<
  TFieldType,
  TContext
> => {
  const resolvedFormHookParams = useMemo(
    () => getFinalUseFormProps(useFormProps, validation),
    [useFormProps, validation]
  );
  const methods = useForm(resolvedFormHookParams);
  const n = useCallback<UseFormBuilderReturn['n']>(p => p, []);
  return { ...methods, onSubmit, onError, n };
};
