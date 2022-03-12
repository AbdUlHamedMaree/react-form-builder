import { useMemo } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { AnyObjectSchema, object } from 'yup';
import { AnyObject, NewUseFormProps } from '../types';
import { getFinalUseFormProps } from '../utils';

export type UseFormBuilderOptions<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  useFormProps?: NewUseFormProps<TFieldType, TContext>;
  validation?: AnyObjectSchema;
  onSubmit?: SubmitHandler<TFieldType>;
  onError?: SubmitErrorHandler<TFieldType>;
};

export type UseFormBuilderReturn<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  onSubmit?: SubmitHandler<TFieldType>;
  onError?: SubmitErrorHandler<TFieldType>;
} & UseFormReturn<TFieldType, TContext>;

export const useFormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  useFormProps = {
    criteriaMode: 'firstError',
    shouldFocusError: true,
  },
  validation = object(),
  onSubmit = () => null,
  onError = (...args) => console.error(args),
}: UseFormBuilderOptions<TFieldType, TContext>): UseFormBuilderReturn<
  TFieldType,
  TContext
> => {
  const resolvedFormHookParams = useMemo(
    () => getFinalUseFormProps(useFormProps, validation),
    [useFormProps, validation]
  );
  const methods = useForm(resolvedFormHookParams);
  return { ...methods, onSubmit, onError };
};
