import React, { useCallback, useMemo } from 'react';
import { AnyObjectSchema } from 'yup';
import {
  FormProvider,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { NewUseFormProps, AnyObject } from '../types';
import { getFinalUseFormProps } from '../utils';
import { handleSubmitContext } from '../context';

const defaultUseFormProps: NewUseFormProps<any, any> = {
  criteriaMode: 'firstError',
  shouldFocusError: true,
  mode: 'onTouched',
  reValidateMode: 'onChange',
};

export type FormBuilderProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  useFormProps?: NewUseFormProps<TFieldType, TContext>;
  validation?: AnyObjectSchema;
  onSubmit?: SubmitHandler<TFieldType>;
  children?: React.ReactNode;
};

export const FormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  useFormProps = defaultUseFormProps,
  validation,
  onSubmit = () => null,
  children,
}: React.PropsWithChildren<
  FormBuilderProps<TFieldType, TContext>
>): ReturnType<React.FC> => {
  const resolvedFormHookParams = useMemo(
    () => getFinalUseFormProps(useFormProps, validation),
    [useFormProps, validation]
  );
  const methods = useForm(resolvedFormHookParams);

  const handleErrors: SubmitErrorHandler<TFieldType> = useCallback((...args) => {
    console.error(args);
  }, []);

  return (
    <FormProvider {...methods}>
      <handleSubmitContext.Provider value={methods.handleSubmit(onSubmit, handleErrors)}>
        {children}
      </handleSubmitContext.Provider>
    </FormProvider>
  );
};
