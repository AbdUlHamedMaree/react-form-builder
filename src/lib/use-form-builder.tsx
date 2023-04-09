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
import { uselessFunction } from '$utils/useless-function';
import type { DefaultValues } from '$types/default-values';

export type UseFormBuilderExtraOptions<TFieldType extends AnyObject = AnyObject> = {
  validation?: AnyObjectSchema;
  onSubmit?: SubmitHandler<TFieldType>;
  onError?: SubmitErrorHandler<TFieldType>;
  defaultValues?: DefaultValues<TFieldType>;
};

export type UseFormBuilderOptions<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = UseFormBuilderExtraOptions<TFieldType> & NewUseFormProps<TFieldType, TContext>;

export type UseFormBuilderExtraReturn<TFieldType extends AnyObject = AnyObject> = {
  onSubmit: SubmitHandler<TFieldType>;
  onError: SubmitErrorHandler<TFieldType>;
  n: <T extends Path<TFieldType>>(path: T) => T;
  triggerFormSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => void;
};

export type UseFormBuilderReturn<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = UseFormBuilderExtraReturn<TFieldType> & UseFormReturn<TFieldType, TContext>;

const uselessSchema = object();
const n: UseFormBuilderReturn['n'] = k => k;

export const useFormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  validation = uselessSchema,
  onSubmit = uselessFunction,
  onError = console.error,
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

  const triggerFormSubmit = useCallback<UseFormBuilderReturn['triggerFormSubmit']>(
    e => methods.handleSubmit(onSubmit, onError)(e),
    [methods.handleSubmit, onError, onSubmit]
  );

  return { ...methods, triggerFormSubmit, onSubmit, onError, n };
};
